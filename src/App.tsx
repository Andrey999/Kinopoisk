import React, { Fragment, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { Header } from './components/Header/Header'
import { MoviesHomePage } from './pages/MoviesHomePage/MoviesHomePage'
import { MoviePage } from './pages/MoviePage/MoviePage'
import { BrowserRouter, Route } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { AuthActions } from './store/actions'

export const App = () => {
    const { user, sessionId, isAuth } = useSelector((state: any) => ({
        user: state.auth.user,
        sessionId: state.auth.sessionId,
        isAuth: state.auth.isAuth
    }), shallowEqual)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(AuthActions.setUserThunk())
    }, [user])

    const onLogOut = () => {
        dispatch(AuthActions.logOut())
    }

    return (
        <BrowserRouter>
            {/* <AppContext.Provider value={{ user, getUser, onLogOut }}> */}
            <Fragment>
                <Header user={user} />
                <Container style={{ marginTop: '75px' }}>
                    <Route exact path="/" component={MoviesHomePage} />
                    <Route path='/movie/:id' component={MoviePage} />
                </Container>
            </Fragment>
            {/* </AppContext.Provider> */}
        </BrowserRouter>
    );
};