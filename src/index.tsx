import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme'

import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("root"));