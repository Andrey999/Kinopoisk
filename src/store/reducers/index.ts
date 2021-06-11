import { combineReducers } from 'redux'
import { authReducer } from './auth'
import { moviesReducer } from './movies'

export const rootReducer = combineReducers({
    auth: authReducer,
    movies: moviesReducer,
})