import React, { useEffect } from 'react';
import { API_URL, API_KEY_3 } from '../../api/api'
import Box from '@material-ui/core/Box';
import { MovieListItem } from './MovieListItem'
import queryString from 'query-string'
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
        // const queryStringParams = {
        //     api_key: API_KEY_3,
        //     language: "ru-RU",
        //     sort_by,
        //     page: props.page,
        //     primary_release_year,
        //     with_genres
        // }
        // if (with_genres.length > 0) {
        //     queryStringParams.with_genres = with_genres.join(',')
        // }
        // const link = `${API_URL}/discover/movie?${queryString.stringify(queryStringParams)}`
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