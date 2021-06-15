import React, { ChangeEvent } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'


interface GenresProps {
    genre: any
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Genres = ({ genre, handleChange }: GenresProps) => (
    <FormControlLabel
        control={
            <Checkbox
                onChange={handleChange}
                value={genre.id}
                color="primary"
            />
        }
        label={genre.name}
    />
)