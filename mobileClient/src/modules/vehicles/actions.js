'use strict'

import * as types from './actionTypes'

export const selectVehicle = vin => ({
  type: types.SELECT_VEHICLE,
  vin,
})

export const setVehicles = vehicles => ({
  type: types.SET_VEHICLES,
  vehicles,
})

