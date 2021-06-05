import React from 'react';
import Button from '@material-ui/core/Button';
import { API_URL, API_KEY_3 } from '../../api/api'
import { fetchApi } from '../../utils/fetchApi'

export const Login = () => {
    const sendPromises = async () => {
        try {
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
                    username: 'Andrey999',
                    password: 'Gromovandrey@198',
                    request_token: getToken.request_token
                })
            })

            // если username и password существуют присваиваем session_id
            const sessionId = await fetchApi(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`, {
                method: "POST",
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ request_token: getValidateWithLogin.request_token })
            })
        } catch (error) {
            console.log('error: ', error)
        }
    }

    return (
        <div>
            <Button color="inherit" onClick={sendPromises}>Login</Button>
        </div>
    );
}