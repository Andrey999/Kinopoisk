import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useStyles } from './style'

interface GenresProps {
    genre: any
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Genres = ({ genre, handleChange }: GenresProps) => {
    const styles = useStyles()
    
    return (
        <FormControlLabel
            control={
                <Checkbox
                    size="small"
                    onChange={handleChange}
                    value={genre.id}
                    color="primary"
                />
            }
            label={genre.name}
        />
    )
}