import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY_3 } from '../../api/api'
import Box from '@material-ui/core/Box';
import { MovieListItem } from './MovieListItem'

interface MovieListProps {
    filters: any
    page: number
}

export const MovieList = (props: MovieListProps) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${props.filters.sort_by}&page=${props.page}`
        fetch(link)
            .then(response => response.json())
            .then(movies => setMovies(movies.results))
    }, [props.filters, props.page])
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