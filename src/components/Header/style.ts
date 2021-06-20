import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headerToolbar: {
            display: 'flex',
            justifyContent: 'space-between',
            minHeight: '50px',
        },
        headerLink: {
            color: theme.palette.background.paper,
            textDecoration: 'none'
        },
        headerUser: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        }
    })
);