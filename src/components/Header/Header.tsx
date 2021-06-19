import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Login } from './Login'
import { User } from './User'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'
import { useStyles } from './style'

interface HeaderProps {
    user: any
}

export const Header = ({ user }: HeaderProps) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed">
            <Container>
                <Toolbar className={classes.headerToolbar}>
                    <Typography variant="h6">
                        <Link to='/' className={classes.headerLink}>
                            Home
                        </Link>
                    </Typography>

                    {user ? <User /> : <Login />}
                </Toolbar>
            </Container>
        </AppBar>
    );
}