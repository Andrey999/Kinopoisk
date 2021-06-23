import { createMuiTheme, createStyles } from '@material-ui/core';

export const theme = createMuiTheme({
    overrides: {
        MuiListItem: createStyles({
            root: {
                alignItems: 'baseline',
                paddingBottom: '0',
            },
            gutters: {
                paddingLeft: '0'
            }
        }),

        MuiListItemText: createStyles({
            root: {
                flex: 'none',
                marginRight: '7px'
            }
        }),

        MuiInputBase: createStyles({
            root: {
                fontSize: '0.875rem'
            }
        }),

        MuiTypography: createStyles({
            body1: {
                fontSize: '0.875rem',
            }
        }),

        MuiFormControlLabel: createStyles({
            root: {
                fontSize: '0.875rem',
                marginLeft: '-7px',
                '& > span:first-child': {
                    padding: '5px'
                }
            }
        })
    }
})