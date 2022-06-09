/*
 * Copyright (c) 2022.
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import createDataContext from './createDataContext'
import detectPresenceApi from '../api/detect-presence-api'
import API_ROUTES from '../api/api_routes'

const reducer = (state, action) => {
   switch (action.type) {
      case 'set_planning':
         return { ...state, planning: action.payload }
      default:
         return state
   }
}

const fetchPlanning = (dispatch) => {
   return async (id, callback) => {
      try {
         const route = API_ROUTES.GET_PLANNING + '/personnel/' + id
         const response = await detectPresenceApi.get(route, {
            header: {
               'Content-Type': 'application/json',
            }
         })
         dispatch({type: 'set_planning', payload: response.data})
         callback(undefined, response.data)
      } catch (e) {
         if (callback)
            callback(e.response.data, undefined)
      }
   }
}

export const { Context, Provider } = createDataContext(reducer, {
   fetchPlanning
}, {
   planning: []
})
