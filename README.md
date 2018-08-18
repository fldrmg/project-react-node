# Car Subscription Signup

> Fork to another git repo. (You might not want to use your personal repo if you do not want your current employer to see this.)

## Problem

Create a React frontend with a Node (micro) backend that allows a customer to create a new car subscription.

A car subscription requires:

* Information from the customer:

  * Name
  * Email
  * Date of Birth
  * Subscription Length (7 or 28 days)
  * Chosen vehicle

* Information from our services:
  * List of vehicles
    * At least description, odometer
  * Pricing

### Required Pages

1.  Create Subscription Page
2.  Success Page With Information About Subscription

### Guidelines

1.  Check into Git periodically
2.  Use any libraries you like
3.  Persistance does not need to be complicated (in-memory is fine)
4.  Take 1 - 2 hours on it
5.  Document your assumptions, describe what else would need to be done to make it "production-ready". Describe the approach you would take to test frontend and backend code.

### What We Are Looking For

1.  Coding skills
2.  Knowledge of React, NodeJS
3.  Ability to learn and apply a new library ([micro](https://github.com/zeit/micro))

# Implementation
I've implemented the client as a mobile app (ReactNative) since this is what we discussed in the
interview. You can find it under `mobileClient`.

## Install
Go to project root and run the following command:
```
yarn
```

## Configure
Edit `/src/config.js` and set the `HOST`

## Run
From project root, execute the following command:
```
yarn ios
```

## About the Project Structure
`modules` are individual modules (one per domain). They normally contain everything needed to be
shared across applications. In the interest of time, there is a small amount of coupling here. In a
production ready build, cross-module dependencies would be injected rather than hard-coded.

Within a module is the following tree
```
moduleName
│
└───components - the UI components that make up the module
│
└───containers - Redux-enabled top-level UI component wrappers
│   │   *Screen.js Represents a UI screen and is automatically added to the app's navigation
│
│   actions - Redux action creators
│   actionTypes - Redux action type constants
│   constants - General module constants (like NAME, etc.)
│   reducer - Redux reducers
```

## Validation
Validation is very basic for this sample app. Production would, at a minimum, auto-focus fields on error and those
jarring alerts would be replaced with something that provided a better UX.
## Dependencies
This sample app relies on `React Native`, `React Navigation`, `Redux`, `Lodash` and `Moment`. At a minimum,
`Redux-Saga` would be added for production in order to remove servcie calls from the UI elements. A
schema validator (`joi`, for example) would also be added for proper validation. `Jest` would be
used for client unit testing while `Mocha` could be used to do the same for the services.
