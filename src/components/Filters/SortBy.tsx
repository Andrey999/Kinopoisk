import React, { Fragment } from 'react'
import { StyledSelect } from '../StyledSelect'
import { sortBy, years } from './ArraysForSelect'

interface SortByProps {
    changeFilters: (e: any) => void
    sort_by: string
    primary_release_year: string
}

export const SortBy = (props: SortByProps) => {
    return (
        <Fragment>
            <StyledSelect
                name='sort_by'
                labelId="sort_by"
                value={props.sort_by}
                changeFilters={props.changeFilters}
                label="Сортировать по"
                menuItem={sortBy}
            />

            <StyledSelect
                name='primary_release_year'
                labelId="primary_release_year"
                value={props.primary_release_year}
                changeFilters={props.changeFilters}
                label="Год релиза"
                menuItem={years}
            />
        </Fragment>
    )
}