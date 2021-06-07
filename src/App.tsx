import React, { useState, useEffect, ChangeEvent } from 'react';
import { MovieList } from './components/Movies/MovieList'
import { Filters } from './components/Filters/Filters'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Header } from './components/Header/Header'
import { fetchApi } from './utils/fetchApi'
import { API_URL, API_KEY_3 } from './api/api'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {}
    }),
);

const defaultFilters = {
    sort_by: 'popularity.desc',
    primary_release_year: '2018',
    with_genres: []
}

export const App = () => {
    const [filters, setFilters] = useState(defaultFilters)
    const [page, setPage] = useState(1)
    const [user, setUser] = useState(null)
    const [sessionId, setSessionId] = useState(null)

    const getUser = (user: any) => setUser(user)

    useEffect(() => {
        const id = localStorage.getItem('sessionId')
        // console.log(ls) 
        if (id) {
            fetchApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${id}`)
                .then(data => getUser(data))
        }
    }, [])

    const changeFilters = (event: any) => {
        const { name, value } = event.target
        setFilters((prev: any) => ({
            ...prev,
            [name]: value
        }))
        setPage(1)
    }

    const changePage = (event: ChangeEvent<unknown>, page: number) => setPage(page)


    const saveSessionId = (sessionId: any) => {
        setSessionId(sessionId)
        localStorage.setItem('sessionId', sessionId)
    }

    return (
        <Container>
            <Header user={user} getUser={getUser} saveSessionId={saveSessionId} />
            <Grid container spacing={3} >
                <Grid item xs={3} sm={3}>
                    <Typography variant="h5">Фильтры: </Typography>
                    <Filters
                        filters={filters}
                        changeFilters={changeFilters}
                        page={page}
                        changePage={changePage}
                    />
                </Grid>

                <Grid item xs={9} sm={9}>
                    <MovieList filters={filters} page={page} />
                </Grid>
            </Grid>
        </Container>
    );
};