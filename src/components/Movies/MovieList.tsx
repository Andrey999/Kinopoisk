import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY_3 } from '../../api/api'
import Box from '@material-ui/core/Box';
import { MovieListItem } from './MovieListItem'
import queryString from 'query-string'
import { Movies } from '../../types/types'
import { MoviesActions } from '../../store/actions/index'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

interface MovieListProps {
    filters: { sort_by: string, primary_release_year: string, with_genres: any }
    page: number
}


export const MovieList = (props: MovieListProps) => {
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
        console.log('work')
        dispatch(MoviesActions.moviesLoadedThunk())
    }, [sort_by, primary_release_year, with_genres])

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