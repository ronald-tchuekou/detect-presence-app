/*
 * Copyright (c) 2022.
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import createDataContext from './createDataContext'
import detectPresenceApi from '../api/detect-presence-api'
import API_ROUTES from '../api/api_routes'
import { ENV } from '../api/env'
import { storeLocaleValue } from '../utils'

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

const signIn = (dispatch) => {
   return async (data, callback) => {
      try {
         const response = await detectPresenceApi.post(API_ROUTES.SIGNING, data)
         await storeLocaleValue(ENV.user_key, response.data, (error, value) => {
            dispatch({ type: 'set_current_user', payload: response.data })
            dispatch({ type: 'set_current_user_token', payload: response.data.accessToken })
            callback(undefined, value)
         })
      } catch (e) {
         callback(e.response.data, undefined)
      }
   }
}

const signOut = (dispatch) => {
   return async (callback) => {
      await storeLocaleValue(ENV.user_key, null, (error, value) => {
         dispatch({ type: 'set_current_user', payload: null })
         dispatch({ type: 'set_current_user_token', payload: null })
         callback(undefined, value)
      })
   }
}

const verifyUserEmail = (dispatch) => {
   console.log(dispatch)
   return async (data, callback) => {
      try {
         const user = await detectPresenceApi.get(API_ROUTES.VERIFY_USER_EMAIL + '/' + data.email)
         callback(undefined, user.data)
      } catch (e) {
         callback(e.response.data, undefined)
      }
   }
}

const resetUserPassword = (dispatch) => {
   return async (data, callback) => {
      try {
         const user = await detectPresenceApi.post(API_ROUTES.RESET_USER_PASSWORD, data)
         const response = await detectPresenceApi.post(API_ROUTES.SIGNING, user.data)
         await storeLocaleValue(ENV.user_key, response.data, (error, value) => {
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
         const response = await detectPresenceApi.put(API_ROUTES.UPDATE_PASS, data, {
            headers: {
               'Content-Type': 'application/json',
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

export const { Context, Provider } = createDataContext(reducer, {
   signIn,
   signOut,
   updatePassword,
   verifyUserEmail,
   resetUserPassword
}, {
   currentUserToken: null,
   currentUser: null,
   formData: null
})
