import React, { ChangeEvent } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


interface GenresProps {
    genre: any
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Genres = (props: GenresProps) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    onChange={props.handleChange}
                    value={props.genre.id}
                    color="primary"
                />
            }
            label={props.genre.name}
        />
    );
};