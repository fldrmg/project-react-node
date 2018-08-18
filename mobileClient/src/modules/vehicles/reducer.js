'use strict'

import * as T from './actionTypes'

const initialState = {
  vehicles: [],
  vehhiclesLoaded: false,
}

const handlers = {
  [T.SELECT_VEHICLE]: (state, { vin: selected }) => {
    return {
      ...state,
      selected,
    }
  },

  [T.SET_VEHICLES]: (state, { vehicles }) => {
    return {
      ...state,
      vehicles,
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
