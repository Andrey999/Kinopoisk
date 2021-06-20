import { USERNAME, PASSWORD, GET_USER, SAVE_SESSION_ID, SET_USER, LOG_OUT, ERROR } from '../constants'

const initialState = {
    // login
    requestToken: null,
    username: '',
    password: '',
    error: null,

    // user
    user: null,
    sessionId: null,
    isAuth: false
}

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case USERNAME:
            return {
                ...state,
                username: action.payload
            }

        case PASSWORD:
            return {
                ...state,
                password: action.payload
            }

        case SAVE_SESSION_ID:
            return {
                ...state,
                sessionId: action.payload,
                isAuth: true
            }

        case GET_USER:
            return {
                ...state,
                user: action.payload
            }

        case SET_USER:
            return {
                ...state,
                user: action.payload
            }

        case LOG_OUT:
            return {
                ...state,
                user: null,
                sessionId: null,
                isAuth: false
            }

        case ERROR:
            return {
                ...state,
                error: action.payload
            }

        default: return state
    }
}