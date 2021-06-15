import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headerToolbar: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        headerLink: {
            color: theme.palette.background.paper,
            textDecoration: 'none'
        },
    })
);