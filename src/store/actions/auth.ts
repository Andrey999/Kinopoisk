import { MOVIES_REQUEST, MOVIES_SUCCESS, MOVIES_ERROR, GENRES_SUCCESS, CHANGE_FILTERS, SET_PAGE } from '../constants'
import { API_URL, API_KEY_3 } from '../../api/api'
import { fetchApi } from '../../utils/fetchApi'
import { store } from '../store'
import { AuthActions } from './index'


export default {

    getAuth(payload: any) {
        return {
            type: 'AUTH',
            payload
        }
    },

    logOut() {
        return {
            type: 'LOG_OUT'
        }
    },

    setUserName(name: string) {
        return {
            type: 'USERNAME',
            payload: name
        }
    },

    setPassword(pasword: string) {
        return {
            type: 'PASSWORD',
            payload: pasword
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
            type: 'SAVE_SESSION_ID',
            payload: sessionId
        }
    },

    setUserThunk() {
        const id = localStorage.getItem('sessionId')
        console.log(id)
        return async (dispatch: any) => {
            console.log(id)
            if (id) {
                const user = await fetchApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${id}`)
                return dispatch({
                    type: 'SET_USER',
                    payload: user
                })
            }
        }
    },

    setError(err: string | null) {
        return {
            type: 'ERROR',
            payload: err
        }
    },

    // получение жанров
    authLoadedThunk() {
        return async (dispatch: any) => {
            try {
                const { auth } = store.getState()

                // получение request token
                const getToken = await fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)

                // проверяем на правильность username и password и присваиваем request token
                const getValidateWithLogin = await fetchApi(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`, {
                    method: "POST",
                    mode: 'cors',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: auth.username,
                        password: auth.password,
                        request_token: getToken.request_token
                    })
                })

                if (getValidateWithLogin.success) dispatch(AuthActions.setError(null))
                else dispatch(AuthActions.setError(getValidateWithLogin.status_message))

                // если username и password существуют присваиваем session_id
                const sessionId = await fetchApi(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`, {
                    method: "POST",
                    mode: 'cors',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ request_token: getValidateWithLogin.request_token })
                })

                if (getValidateWithLogin.success) dispatch(AuthActions.saveSessionId(sessionId.session_id))

                // после получения session_id получаем пользователя
                const user = await fetchApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${sessionId.session_id}`)
                dispatch({
                    type: 'GET_USER',
                    payload: user
                })
                // setOpen(false)
            } catch (err) {
                console.log(err)
            }
        }
    },
}