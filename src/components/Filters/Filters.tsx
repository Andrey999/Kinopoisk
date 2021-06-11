import React, { ChangeEvent, useState, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Pagination from '@material-ui/lab/Pagination';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import { MoviesActions } from '../../store/actions/index'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

interface FiltersProps {
    filters: { sort_by: string, primary_release_year: string, with_genres: any }
    changeFilters: (e: any) => void
    page: number
    changePage: (event: ChangeEvent<unknown>, page: number) => void
}

export const Filters = (props: FiltersProps) => {
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.changeFilters({
            target: {
                name: "with_genres",
                value: event.target.checked ? [...with_genres, event.target.value]
                    : with_genres.filter((genre: any) => genre !== event.target.value)
            }
        });
    };

    return (
        <FormControl size="small" variant="outlined" >
            <InputLabel id="sort_by">Сортировать по</InputLabel>
            <Select
                name='sort_by'
                labelId="sort_by"
                value={sort_by}
                onChange={props.changeFilters}
                label="Сортировать по"
            >
                <MenuItem value='popularity.desc'>Популярные по убыванию</MenuItem>
                <MenuItem value='popularity.asc'>Популярные по возростанию</MenuItem>
                <MenuItem value='vote_average.desc'>Рейтинг по убыванию</MenuItem>
                <MenuItem value='vote_average.asc'>Рейтинг по возростанию</MenuItem>
            </Select>

            <InputLabel id="primary_release_year">Год релиза:</InputLabel>
            <Select
                name='primary_release_year'
                labelId="primary_release_year"
                value={primary_release_year}
                onChange={props.changeFilters}
                label="Год релиза"
            >
                <MenuItem value='2018'>2018</MenuItem>
                <MenuItem value='2019'>2019</MenuItem>
                <MenuItem value='2020'>2020</MenuItem>
                <MenuItem value='2021'>2021</MenuItem>
            </Select>

            <Pagination count={10} page={page} onChange={props.changePage} />

            <Box display="flex" flexDirection="column">
                {genre.map((g: any) => {
                    return (
                        <FormControlLabel
                            key={g.id}
                            control={
                                <Checkbox
                                    onChange={handleChange}
                                    value={g.id}
                                    color="primary"
                                />
                            }
                            label={g.name}
                        />
                    )
                })}
            </Box>
        </FormControl>
    )
}