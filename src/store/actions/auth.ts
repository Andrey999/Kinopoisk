import { USERNAME, PASSWORD, GET_USER, SAVE_SESSION_ID, SET_USER, LOG_OUT, ERROR } from '../constants'
import { CallApi } from '../../api/fetchApi'
import { store } from '../store'
import { AuthActions } from './index'

export default {
    setUserName(name: string) {
        return {
            type: USERNAME,
            payload: name
        }
    },

    setPassword(pasword: string) {
        return {
            type: PASSWORD,
            payload: pasword
        }
    },

    // получение сессии
    authLoadedThunk() {
        return async (dispatch: any) => {
            try {
                const { auth } = store.getState()

                // получение request token
                const getToken = await CallApi.get(`/authentication/token/new`, {})

                // проверяем на правильность username и password и присваиваем request token
                const getValidateWithLogin = await CallApi.post(`/authentication/token/validate_with_login`, {
                    body: JSON.stringify({
                        username: auth.username,
                        password: auth.password,
                        request_token: getToken.request_token
                    })
                })

                if (getValidateWithLogin.success) dispatch(AuthActions.setError(null))
                else dispatch(AuthActions.setError(getValidateWithLogin.status_message))

                // если username и password существуют присваиваем session_id
                const sessionId = await CallApi.post(`/authentication/session/new`, {
                    body: JSON.stringify({ request_token: getValidateWithLogin.request_token })
                })

                if (getValidateWithLogin.success) dispatch(AuthActions.saveSessionId(sessionId.session_id))

                // после получения session_id получаем пользователя
                const user = await CallApi.get(`/account`, {
                    params: {
                        session_id: sessionId.session_id
                    }
                })
                if (sessionId.session_id) {
                    dispatch({
                        type: GET_USER,
                        payload: user
                    })
                }

            } catch (err) {
                console.log(err)
            }
        }
    },

    saveSessionId(sessionId: any) {
        if (sessionId) {
            localStorage.setItem('sessionId', sessionId)
        }
        else {
            localStorage.removeItem('sessionId')
        }
        return {
            type: SAVE_SESSION_ID,
            payload: sessionId
        }
    },

    userUpdateThunk() {
        const id = localStorage.getItem('sessionId')

        return async (dispatch: any) => {
            if (id) {
                const user = await CallApi.get(`/account`, {
                    params: {
                        session_id: id
                    }
                })
                return dispatch({
                    type: SET_USER,
                    payload: user
                })
            }
        }
    },

    logOut() {
        return async (dispatch: any) => {
            const { auth } = store.getState()
            localStorage.removeItem('sessionId')

            await CallApi.delete(`/authentication/session`, {
                body: JSON.stringify({ session_id: auth.sessionId })
            })
            return dispatch({
                type: LOG_OUT
            })
        }
    },

    setError(err: string | null) {
        return {
            type: ERROR,
            payload: err
        }
    },
}