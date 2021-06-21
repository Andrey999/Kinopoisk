import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { MovieListItem } from './MovieListItem'
import { MoviesActions } from '../../store/actions/index'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

export const MovieList = () => {
    const { movies, sort_by, primary_release_year, with_genres, page } = useSelector((state: any) => ({
        movies: state.movies.movies,
        sort_by: state.movies.sort_by,
        primary_release_year: state.movies.primary_release_year,
        with_genres: state.movies.with_genres,
        page: state.movies.page
    }), shallowEqual)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(MoviesActions.moviesLoadedThunk())
    }, [sort_by, primary_release_year, with_genres, page])

    return (
        <Box display='flex' justifyContent='space-between' flexWrap="wrap">
            {movies.map((movies: any) => {
                return (
                    <div key={movies.id}>
                        <MovieListItem movies={movies} />
                    </div>
                )
            })}
        </Box>
    );
};