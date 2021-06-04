import React, { useState, ChangeEvent } from 'react';
import { MovieList } from './components/Movies/MovieList'
import { Filters } from './components/Filters/Filters'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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

    const changeFilters = (event: any) => {
        const { name, value } = event.target
        setFilters((prev: any) => ({
            ...prev,
            [name]: value
        }))
        setPage(1)
    }

    const changePage = (event: ChangeEvent<unknown>, page: number) => setPage(page)

    return (
        <Container>
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