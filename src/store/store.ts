import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from './reducers/index'
import thunkMiddleware from 'redux-thunk'

// @ts-ignore
let composeWithDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeWithDevtools(applyMiddleware(thunkMiddleware)))