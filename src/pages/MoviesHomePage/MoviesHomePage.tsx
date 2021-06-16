import React from 'react'
import { MovieList } from '../../components/Movies/MovieList'
import { Filters } from '../../components/Filters/Filters'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

export const MoviesHomePage = () => (
    <Container>
        <Grid container spacing={2}>
            <Grid item xs={3} sm={3}>
                <Typography variant="h5">Фильтры: </Typography>
                <Filters />
            </Grid>

            <Grid item xs={9} sm={9}>
                <MovieList />
            </Grid>
        </Grid>
    </Container>
)