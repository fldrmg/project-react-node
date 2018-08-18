'use strict'

import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import * as modules from './src/modules'

const reducers = {}
const screens = {}

//Auto-configure app (convention over configuration)
Object.keys(modules).forEach(moduleName => {
  //configure module reducers (reducers are in module.recuder and constants.NAME is state key)
  const module = modules[moduleName]
  reducers[module.constants.NAME] = module.reducer

  //configure screens for nav (screens are named *Screen.js and are always containers)
  const containers = modules[moduleName].containers
  Object.keys(containers).forEach((containerName) => {
    if (/Screen$/gi.test(containerName)) {
      screens[`${containerName.replace(/Screen$/gi, '')}`] = containers[containerName]
    }
  })
})

const store = createStore(combineReducers(reducers))
const RootStack = createStackNavigator(screens)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    )
  }
}
