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
        })
    }
});