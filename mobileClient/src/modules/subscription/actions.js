'use strict'

import * as types from './actionTypes'

export const updateLocalSubscription = subscription => ({
  type: types.UPDATE_LOCAL_SUBSCRIPTION,
  subscription,
})
