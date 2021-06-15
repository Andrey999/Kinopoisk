import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useStyles } from '../Header/style'

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
    const { name, labelId, value, changeFilters, menuItem, label } = props

    return (
        <FormControl size="small" variant="outlined" >
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                name={name}
                labelId={labelId}
                value={value}
                onChange={changeFilters}
                label={label}
            >
                {menuItem.map((item: any) => {
                    return <MenuItem key={item.id} value={item.id}>{item.value}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}