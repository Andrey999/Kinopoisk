const initialState = {
    user: null,
    sessionId: localStorage.getItem("sessionId"),
    isAuth: false
}

export const authReducer = (state = initialState, action: any) => {
    switch (action) {
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

        default: return state

    }
    return state
}