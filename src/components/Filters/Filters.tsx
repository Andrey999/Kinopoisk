import React, { ChangeEvent, useEffect } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import { MoviesActions } from '../../store/actions/index'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Genres } from './Genres'
import { SortBy } from './SortBy'

export const Filters = () => {
    const { genre, sort_by, primary_release_year, with_genres, page } = useSelector((state: any) => ({
        genre: state.movies.genre,
        sort_by: state.movies.sort_by,
        primary_release_year: state.movies.primary_release_year,
        with_genres: state.movies.with_genres,
        page: state.movies.page
    }), shallowEqual)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(MoviesActions.genresLoadedThunk())
    }, [])

    const changeFilters = (event: any) => {
        const { name, value } = event.target
        dispatch(MoviesActions.changeFilters(name, value))
        dispatch(MoviesActions.setPage(1))
    }

    const changePage = (event: ChangeEvent<unknown>, page: number) => dispatch(MoviesActions.setPage(page))

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeFilters({
            target: {
                name: "with_genres",
                value: event.target.checked ? [...with_genres, event.target.value]
                    : with_genres.filter((genre: any) => genre !== event.target.value)
            }
        });
    };

    return (
        <Box>
            <SortBy
                sort_by={sort_by}
                primary_release_year={primary_release_year}
                changeFilters={changeFilters}
            />
            <Pagination count={10} page={page} onChange={changePage} />

            <Box display="flex" flexDirection="column">
                {genre.map((genre: any) =>
                    <Genres key={genre.id}
                        genre={genre}
                        handleChange={handleChange}
                    />)}
            </Box>
        </Box>
    )
}