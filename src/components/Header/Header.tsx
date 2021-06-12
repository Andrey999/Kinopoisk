import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Login } from './Login'
import { User } from './User'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

interface HeaderProps {
    user: any
    saveSessionId: (sessionId: any) => void
}

export const Header = (props: HeaderProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Home
                    </Typography>
                        {props.user ? <User /> : <Login saveSessionId={props.saveSessionId} />}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}