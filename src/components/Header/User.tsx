import React, { useContext } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { AppContext } from '../../App'

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

export const User = () => {
    const userContext = useContext(AppContext)
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar alt={`${userContext.user.username}`} src={`https://secure.gravatar.com/avatar/${userContext.user.avatar.gravatar.hash}`} />
        </div>
    )
}