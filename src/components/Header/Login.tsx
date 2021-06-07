import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { API_URL, API_KEY_3 } from '../../api/api'
import { fetchApi } from '../../utils/fetchApi'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AppContext } from '../../App'

interface LoginProps {
    saveSessionId: (sessionId: any) => void
}

export const Login = (props: LoginProps) => {
    const { getUser } = useContext(AppContext)

    const [open, setOpen] = useState(false)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    const onSubmit = async () => {
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
                    username: userName,
                    password,
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
            props.saveSessionId(sessionId.session_id)

            // после получения session_id получаем пользователя
            const user = await fetchApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${sessionId.session_id}`)
            getUser(user)
            setOpen(false)
        } catch (error) {
            setErrors((prev: any) => ({ ...prev, base: error.status_message }))
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const validateFields = () => {
        if (userName === '') {
            setErrors((prev: any) => ({ ...prev, userName: 'not empty' }))
        }
        if (password === '') {
            setErrors((prev: any) => ({ ...prev, password: 'not empty' }))
        }
        else {
            setErrors({})
        }
    }

    const onLogin = (event: any) => {
        event.preventDefault()
        if (Object.keys(errors).length) {
            setErrors(validateFields)
        } else {
            onSubmit()
        }
    }

    const changeUsername = (event: any) => {
        setUserName(event.target.value)
        setErrors((prev: any) => ({ ...prev, userName: null }))
    }

    const changePassword = (event: any) => {
        setPassword(event.target.value)
        setErrors((prev: any) => ({ ...prev, password: null }))
    }

    return (
        <div>
            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
            <div>
                <Dialog open={open} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Авторизация</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Логин"
                            type="text"
                            fullWidth
                            name="username"
                            value={userName}
                            onChange={changeUsername}
                        />
                        {errors.userName && (<div>{errors.userName}</div>)}
                        <TextField
                            margin="dense"
                            id="password"
                            label="Пароль"
                            type="password"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={changePassword}
                        />
                        {errors.password && (<div>{errors.password}</div>)}

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={onLogin} color="primary">
                            Вход
                        </Button>
                    </DialogActions>

                    <DialogActions>
                        {errors.base && (<div>{errors.base}</div>)}
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}