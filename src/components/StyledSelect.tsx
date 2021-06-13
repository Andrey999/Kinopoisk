import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useStyles } from './style'

interface StyledSelectProps {
    name: string
    labelId: string
    value: string
    changeFilters: (e: any) => void
    menuItem: any
    label: string
}

export const StyledSelect = (props: StyledSelectProps) => {
    const styles = useStyles()

    return (
        <FormControl size="small" variant="outlined" >
            <InputLabel id={props.labelId}>{props.label}</InputLabel>
            <Select
                name={props.name}
                labelId={props.labelId}
                value={props.value}
                onChange={props.changeFilters}
                label={props.label}
            >
                {props.menuItem.map((item: any) => {
                    return <MenuItem key={item.id} value={item.id}>{item.value}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}