import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '250px',
            maxWidth: 250,
            marginBottom: '10px',
            minHeight: '250px'
        },
        media: {
            height: 140,
        },
        link: {
            textDecoration: 'none',
            color: theme.palette.primary.dark
        }
    })
)