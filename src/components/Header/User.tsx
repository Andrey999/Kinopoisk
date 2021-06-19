import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { fetchApi } from '../../utils/fetchApi'
import { API_URL, API_KEY_3 } from '../../api/api'
import { AuthActions } from '../../store/actions/index'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
)

export const User = () => { 
    const classes = useStyles();
    const [userDropdown, setUserDropdown] = React.useState<null | HTMLElement>(null)

    const { user, sessionId } = useSelector((state: any) => ({
        user: state.auth.user,
        sessionId: state.auth.sessionId
    }), shallowEqual)
    const dispatch = useDispatch()

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
            body: JSON.stringify({ session_id: sessionId })
        }).then(() => {
            dispatch(AuthActions.logOut())
        })
        setUserDropdown(null)
    }

    return (
        <div className={classes.root}>
            {/* <div > */}
            <Avatar
                alt={`${user.username}`}
                src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}`}
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
