import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { AuthActions } from '../../store/actions/index'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

export const Login = () => {
    const { username, password, error } = useSelector((state: any) => ({
        username: state.auth.username,
        password: state.auth.password,
        error: state.auth.error,
    }), shallowEqual)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState<{ userName: string, password: string } | {}>({})

    const onSubmit = () => {
        dispatch(AuthActions.authLoadedThunk())
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const onLogin = (event: any) => {
        event.preventDefault()

        if (username === '') {
            return setErrors(({ userName: 'field must be filled' }))
        }
        if (password == '') {
            return setErrors(({ password: 'field must be filled' }))
        }
        else {
            onSubmit()
        }
    }

    const changeUsername = (event: any) => {
        dispatch(AuthActions.setUserName(event.target.value))
        dispatch(AuthActions.setError(null))
        setErrors((prev: any) => ({ ...prev, username: null }))
    }

    const changePassword = (event: any) => {
        dispatch(AuthActions.setPassword(event.target.value))
        dispatch(AuthActions.setError(null))
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
                            value={username}
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
                        {error && (<div>{error}</div>)}
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}