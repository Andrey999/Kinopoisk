import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { API_URL, API_KEY_3 } from '../../api/api'

export const Login = () => {
    return (
        <div>
            <Button color="inherit" onClick={sendPromises}>Login</Button>
        </div>
    );
}