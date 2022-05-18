/*
 * Copyright (c) 2022.
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import createDataContext from './createDataContext'
import bigoodeeApi from '../api/bigoodee-api'
import API_ROUTES from '../api/api_routes'
import { ENV } from '../api/env'
import { storeLocalValue, uploadImage } from '../utils'

const reducer = (state, action) => {
   switch (action.type) {
      case 'set_form_data_field':
         const payload = action.payload
         return { ...state, formData: { ...(state.formData ? state.formData : {}), [payload.key]: payload.value } }
      case 'set_current_user':
         return { ...state, currentUser: action.payload }
      case 'set_current_user_token':
         return { ...state, currentUserToken: action.payload }
      default:
         return state
   }
}

const createUser = (dispatch) => {
   return async (data, callback) => {
      try {
         await bigoodeeApi.post(API_ROUTES.SIGNUP, data)
         const response = await bigoodeeApi.post(API_ROUTES.SIGNING, {
            email: data.email,
            password: data.password
         })
         await storeLocalValue(ENV.user_key, response.data, (err, value) => {
            dispatch({ type: 'set_current_user', payload: value })
            dispatch({ type: 'set_current_user_token', payload: value.accessToken })
            callback(undefined, value)
         })
      } catch (e) {
         callback(e.response.data, undefined)
      }
   }
}

const signIn = (dispatch) => {
   return async (data, callback) => {
      try {
         const response = await bigoodeeApi.post(API_ROUTES.SIGNING, data)
         await storeLocalValue(ENV.user_key, response.data, (error, value) => {
            dispatch({ type: 'set_current_user', payload: response.data })
            dispatch({ type: 'set_current_user_token', payload: response.data.accessToken })
            callback(undefined, value)
         })
      } catch (e) {
         callback(e.response.data, undefined)
      }
   }
}

const signInWithFacebook = (dispatch) => {
   return async (data, callback) => {
      try {
         const response = await bigoodeeApi.post(API_ROUTES.SIGN_IN_WITH_FACEBOOK, data)
         await storeLocalValue(ENV.user_key, response.data, (error, value) => {
            dispatch({ type: 'set_current_user', payload: response.data })
            dispatch({ type: 'set_current_user_token', payload: response.data.accessToken })
            callback(undefined, value)
         })
      } catch (e) {
         callback(e.response.data, undefined)
      }
   }
}

const setUser = (dispatch) => {
   return (data, callback) => {
      dispatch({ type: 'set_current_user', payload: data })
      dispatch({ type: 'set_current_user_token', payload: data.accessToken })
      callback()
   }
}

const signOut = (dispatch) => {
   return (callback) => {
      dispatch({ type: 'set_current_user', payload: null })
      dispatch({ type: 'set_current_user_token', payload: null })
      callback()
   }
}

const verifyUserEmail = (dispatch) => {
   console.log(dispatch)
   return async (data, callback) => {
      try {
         const user = await bigoodeeApi.get(API_ROUTES.VERIFY_USER_EMAIL + '/' + data.email)
         callback(undefined, user.data)
      } catch (e) {
         callback(e.response.data, undefined)
      }
   }
}

const getUserProfile = (dispatch) => {
   console.log(dispatch)
   return async (token, callback) => {
      try {
         const user = await bigoodeeApi.get(API_ROUTES.USER_PROFILE, {
            headers: {
               'x-access-token': token
            }
         })
         callback(undefined, user.data)
      } catch (e) {
         callback(e.response.data, undefined)
      }
   }
}

const resetUserPassword = (dispatch) => {
   return async (data, callback) => {
      try {
         const user = await bigoodeeApi.post(API_ROUTES.RESET_USER_PASSWORD, data)
         const response = await bigoodeeApi.post(API_ROUTES.SIGNING, user.data)
         await storeLocalValue(ENV.user_key, response.data, (error, value) => {
            dispatch({ type: 'set_current_user', payload: response.data })
            dispatch({ type: 'set_current_user_token', payload: response.data.accessToken })
            callback(undefined, value)
         })
      } catch (e) {
         callback(e.response.data, undefined)
      }
   }
}

const updatePassword = (dispatch) => {
   console.log(dispatch)
   return async (data, callback) => {
      try {
         const response = await bigoodeeApi.put(API_ROUTES.UPDATE_PASS, data, {
            headers: {
               'x-access-token': data.token
            }
         })
         if (callback)
            callback(undefined, response.data)
      } catch (e) {
         if (callback)
            callback(e.response.data, undefined)
      }
   }
}

const updateNotifyToken = (dispatch) => {
   console.log(dispatch)
   return async (data, callback) => {
      try {
         const response = await bigoodeeApi.put(API_ROUTES.UPDATE_NOTIFY_TOKEN, data, {
            headers: {
               'x-access-token': data.token
            }
         })
         if (callback)
            callback(undefined, response.data)
      } catch (e) {
         if (callback)
            callback(e.response.data, undefined)
      }
   }
}

const updateProfil = (dispatch) => {
   return async (data, callback) => {
      try {
         await bigoodeeApi.put(API_ROUTES.UPDATE_PROFILE, data.data, {
            headers: {
               'x-access-token': data.data.token
            }
         })
         const user = { ...data.currentUser, ...data.data }
         await storeLocalValue(ENV.user_key, user, (error, value) => {
            dispatch({ type: 'set_current_user', payload: user })
            dispatch({ type: 'set_current_user_token', payload: user.token })
            callback(undefined, value)
         })
      } catch (e) {
         callback(e.response.data, undefined)
      }
   }
}

const setFormDataField = (dispatch) => {
   return (data, callback) => {
      dispatch({ type: 'set_form_data_field', payload: data })
      callback()
   }
}

const setUserImage = (dispatch) => {
   return async (token, formData, user, callback) => {
      try {
         let fileJson
         fileJson = await uploadImage(formData, token, 'avatar')
         await bigoodeeApi.put(`${API_ROUTES.UPDATE_USER_IMG}`, { imageURL: fileJson.path }, {
            headers: {
               'x-access-token': token
            }
         })
         await storeLocalValue(ENV.user_key, { ...user, imageURL: fileJson.path }, (error, value) => {
            dispatch({ type: 'set_current_user', payload: value })
            dispatch({ type: 'set_current_user_token', payload: token })
            callback(undefined, value)
         })
      } catch (e) {
         callback(true, undefined)
         console.log(JSON.stringify(e))
      }
   }
}

export const { Context, Provider } = createDataContext(reducer, {
   createUser,
   signIn,
   signOut,
   updatePassword,
   updateProfil,
   setFormDataField,
   setUser,
   verifyUserEmail,
   resetUserPassword,
   getUserProfile,
   setUserImage,
   updateNotifyToken,
   signInWithFacebook
}, {
   currentUserToken: null,
   currentUser: null,
   formData: null
})
