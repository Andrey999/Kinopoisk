import React, { ChangeEvent } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Pagination from '@material-ui/lab/Pagination';

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
    filters: any
    changeFilters: (e: any) => void
    page: number
    changePage: (event: ChangeEvent<unknown>, page: number) => void
}

export const Filters = (props: FiltersProps) => {
    return (
        <FormControl size="small" variant="outlined" >
            <InputLabel id="sort_by">Сортировать по</InputLabel>
            <Select
                name='sort_by'
                labelId="sort_by"
                value={props.filters.sort_by}
                onChange={props.changeFilters}
                label="Сортировать по"
            >
                <MenuItem value='popularity.desc'>Популярные по убыванию</MenuItem>
                <MenuItem value='popularity.asc'>Популярные по возростанию</MenuItem>
                <MenuItem value='vote_average.desc'>Рейтинг по убыванию</MenuItem>
                <MenuItem value='vote_average.asc'>Рейтинг по возростанию</MenuItem>
            </Select>

            <Pagination count={10} page={props.page} onChange={props.changePage} />
        </FormControl>
    )
}