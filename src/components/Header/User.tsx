import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

interface UserProps {
    user: any
}

export const User = (props: UserProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar alt={`${props.user.username}`} src={`https://secure.gravatar.com/avatar/${props.user.avatar.gravatar.hash}`} />
        </div>
    )
}