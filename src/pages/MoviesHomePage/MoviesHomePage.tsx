import React, { ChangeEvent } from 'react';
import { MovieList } from '../../components/Movies/MovieList'
import { Filters } from '../../components/Filters/Filters'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { MoviesActions } from '../../store/actions/index'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'


export const MoviesHomePage = () => {
    const { page } = useSelector((state: any) => ({
        page: state.movies.page
    }), shallowEqual)
    const dispatch = useDispatch()

    const changeFilters = (event: any) => {
        const { name, value } = event.target
        dispatch(MoviesActions.changeFilters(name, value))
        dispatch(MoviesActions.setPage(1))
    }

    const changePage = (event: ChangeEvent<unknown>, page: number) => dispatch(MoviesActions.setPage(page))

    return (
        <Container>
            <Grid container spacing={3} >
                <Grid item xs={3} sm={3}>
                    <Typography variant="h5">Фильтры: </Typography>
                    <Filters
                        changeFilters={changeFilters}
                        page={page}
                        changePage={changePage}
                    />
                </Grid>

                <Grid item xs={9} sm={9}>
                    <MovieList />
                </Grid>
            </Grid>
        </Container>
    );
};