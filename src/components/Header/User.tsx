import React, { useContext, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AppContext } from '../../App'
import { fetchApi } from '../../utils/fetchApi';
import { API_URL, API_KEY_3 } from '../../api/api'

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
    const [userDropdown, setUserDropdown] = React.useState<null | HTMLElement>(null)

    const userDropdownOpen = (event: any) => {
        setUserDropdown(event.currentTarget);
    };

    const userDropdownClose = () => {
        setUserDropdown(null);
    };

    const clearSession = () => {
        fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ session_id: userContext.sessionId })
        }).then(() => {
            userContext.onLogOut()
        })
        setUserDropdown(null)
    }

    return (
        <div className={classes.root}>
            {/* <div > */}
            <Avatar
                alt={`${userContext.user.username}`}
                src={`https://secure.gravatar.com/avatar/${userContext.user.avatar.gravatar.hash}`}
                onClick={userDropdownOpen}
            />
            {/* </div> */}

            <div>
                <Menu
                    id="simple-menu"
                    anchorEl={userDropdown}
                    keepMounted
                    open={Boolean(userDropdown)}
                    onClose={userDropdownClose}
                >
                    <MenuItem onClick={clearSession}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    )
}
