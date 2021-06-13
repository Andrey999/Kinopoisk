import React, { ChangeEvent, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import { MoviesActions } from '../../store/actions/index'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Genres } from './Genres'
import { StyledSelect } from '../StyledSelect'
import { sortBy, years } from './ArraysForSelect'

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
        <Box>
            <StyledSelect
                name='sort_by'
                labelId="sort_by"
                value={sort_by}
                changeFilters={props.changeFilters}
                label="Сортировать по"
                menuItem={sortBy}
            />

            <StyledSelect
                name='primary_release_year'
                labelId="primary_release_year"
                value={primary_release_year}
                changeFilters={props.changeFilters}
                label="Год релиза"
                menuItem={years}
            />

            {/* <FormControl size="small" variant="outlined" >
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
            </FormControl> */}


            {/* <FormControl size="small" variant="outlined" >
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
            </FormControl> */}

            <Pagination count={10} page={page} onChange={props.changePage} />

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