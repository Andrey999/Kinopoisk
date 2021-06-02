import React, { useState } from 'react';
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
    sort_by: 'popularity.desc'
}

export const App = () => {
    const [filters, setFilters] = useState(defaultFilters)
   

    const changeFilters = (event: any) => {
        const { name, value } = event.target
        setFilters((prev: any) => ({
            ...prev.filters,
            [name]: value
        }))
    }

    return (
        <Container>
            <Grid container spacing={3} >
                <Grid item xs={4} sm={4}>
                    <Typography variant="h5">Фильтры: </Typography>
                    <Filters filters={filters} changeFilters={changeFilters} />
                </Grid>

                <Grid item xs={8} sm={8}>
                    <MovieList filters={filters} />
                </Grid>
            </Grid>
        </Container>
    );
};