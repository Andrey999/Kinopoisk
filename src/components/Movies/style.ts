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
        },

        // singleMovie
        singleMovieContainer: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        singleMovieImage: {
            width: '280px'
        },
        singleMovieContent: {
            marginLeft: '10px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        },
        singleMovieTitle: {
            margin: '0 auto',
        }
    })
)