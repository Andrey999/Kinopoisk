import React, { useState, useEffect, ChangeEvent, createContext } from 'react';
import { MovieList } from './components/Movies/MovieList'
import { Filters } from './components/Filters/Filters'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Header } from './components/Header/Header'
import { fetchApi } from './utils/fetchApi'
import { API_URL, API_KEY_3 } from './api/api'
import { MoviesHomePage } from './pages/MoviesHomePage/MoviesHomePage'
import { MoviePage } from './pages/MoviePage/MoviePage'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {}
    }),
);

export const AppContext = createContext()

export const App = () => {
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
        localStorage.removeItem('sessionId')
        setSessionId(null)
        setUser(null)
    }

    return (
        <AppContext.Provider value={{ user, getUser, onLogOut, sessionId }}>
            <Container>
                <Header user={user} saveSessionId={saveSessionId} />
                <MoviesHomePage />
            </Container>
        </AppContext.Provider>
    );
};