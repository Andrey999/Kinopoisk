import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { fetchApi } from '../../utils/fetchApi'
import { API_URL, API_KEY_3 } from '../../api/api'
import { AuthActions } from '../../store/actions/index'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useStyles } from './style'

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
        dispatch(AuthActions.logOut())
        setUserDropdown(null)
    }

    return (
        <div className={classes.headerUser}>
            <Avatar
                alt={`${user.username}`}
                src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash} || null`}
                onClick={userDropdownOpen}
            />

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
