import React, { useState, useEffect, createContext } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Header } from './components/Header/Header'
import { fetchApi } from './utils/fetchApi'
import { API_URL, API_KEY_3 } from './api/api'
import { MoviesHomePage } from './pages/MoviesHomePage/MoviesHomePage'
import { MoviePage } from './pages/MoviePage/MoviePage'
import { BrowserRouter, Route, useParams } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { AuthActions } from './store/actions'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {}
    }),
);

export const AppContext = createContext()

export const App = () => {
    const getAuth = useSelector((state: any) => ({
        user: state.user,
        sessionId: state.sessionId,
        isAuth: state.isAuth
    }), shallowEqual)

    console.log(getAuth)
    const dispatch = useDispatch()

    const [user, setUser] = useState(null)
    const [sessionId, setSessionId] = useState<string | null>(null)

    const getUser = (user: any) => setUser(user)

    useEffect(() => {
        const id = localStorage.getItem('sessionId')
        if (id) {
            fetchApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${id}`)
                .then(user => {
                    getUser(user)
                    setSessionId(id)
                })
        }
    }, [])

    const saveSessionId = (sessionId: any) => {
        if (sessionId) {
            localStorage.setItem('sessionId', sessionId)
        }
        else {
            localStorage.removeItem('sessionId')
        }
        setSessionId(sessionId)
    }

    const onLogOut = () => {
        dispatch(AuthActions.logOut())
        setSessionId(null)
        setUser(null)
    }

    return (
        <BrowserRouter>
            <AppContext.Provider value={{ user, getUser, onLogOut, sessionId }}>
                <Container>
                    <Header user={user} saveSessionId={saveSessionId} />
                    <Route exact path="/" component={MoviesHomePage} />
                    <Route path='/movie/:id' component={MoviePage} />
                </Container>
            </AppContext.Provider>
        </BrowserRouter>
    );
};