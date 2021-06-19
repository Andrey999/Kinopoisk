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

        case 'GET_TOKEN':
            return {
                ...state,
                requestToken: action.payload
            }

        case 'AUTH':
            localStorage.setItem('sessionId', action.payload.id)

            return {
                ...state,
                user: action.payload.user,
                sessionId: action.payload.id,
                isAuth: true
            }
        case 'LOG_OUT':
            localStorage.removeItem('sessionId')

            return {
                ...state,
                user: null,
                sessionId: null,
                isAuth: false
            }

        case 'USERNAME':
            return {
                ...state,
                username: action.payload
            }

        case 'PASSWORD':
            return {
                ...state,
                password: action.payload
            }

        case 'ERROR':
            return {
                ...state,
                error: action.payload
            }

        case 'SAVE_SESSION_ID':
            return {
                ...state,
                sessionId: action.payload,
                isAuth: true
            }

        case 'GET_USER':
            return {
                ...state,
                user: action.payload
            }

        case 'SET_USER':
            return {
                ...state,
                user: state.user
            }

        default: return state

    }
    return state
}