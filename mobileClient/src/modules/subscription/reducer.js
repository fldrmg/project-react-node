'use strict'

import * as T from './actionTypes'
import moment from 'moment'

const initialState = {
  subscription: {
    dob: moment().subtract(21, 'years').toDate(),
    duration: 7,
  },
}

const handlers = {
  [T.UPDATE_LOCAL_SUBSCRIPTION]: (state, { subscription }) => {
    return {
      ...state,
      subscription,
    }
  },

  //Hard-coded dependency. Normally this would be injected via an init func.
  ['vehicles/SELECT_VEHICLE']: (state, { vin }) => {
    return {
      ...state,
      subscription: {
        ...state.subscription,
        duration: 7,
        vin,
      }
    }
  },
}

export default (state = initialState, action) => {

  const handler = handlers[action.type]

  if (handler) {
    return handler(state, action)
  }
  return state
}
