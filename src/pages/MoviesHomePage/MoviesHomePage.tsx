import React from 'react'
import { MovieList } from '../../components/Movies/MovieList'
import { Filters } from '../../components/Filters/Filters'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

export const MoviesHomePage = () => (
    <Container style={{ marginTop: '90px' }}>
        <Grid container spacing={2}>
            <Grid item xs={2} sm={2}>
                <Typography variant="h5">Фильтры: </Typography>
                <Filters />
            </Grid>

            <Grid item xs={10} sm={10}>
                <MovieList />
            </Grid>
        </Grid>
    </Container>
)