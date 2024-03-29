import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { MoviesActions } from '../../store/actions'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useStyles } from './style'

interface SingleMovieProps {
    params: any
}

export const SingleMovie = ({ params }: SingleMovieProps) => {
    const classes = useStyles()
    const { singleMovie } = useSelector((state: any) => ({
        singleMovie: state.movies.singleMovie
    }), shallowEqual)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(MoviesActions.getSingleMovie(params.id))
    }, [])

    const goBack = () => {
        history.push('/')
        dispatch(MoviesActions.clearSingleMovie())
    }

    return (
        <Fragment>
            <IconButton className={classes.btnBack} aria-label="back" onClick={goBack}>
                <ArrowBackIosIcon />
            </IconButton>

            <Card className={classes.singleMovieContainer}>
                <CardMedia
                    component="img"
                    className={classes.singleMovieImage}
                    src={singleMovie.backdrop_path != null ?
                        `https://image.tmdb.org/t/p/w500${singleMovie.poster_path || singleMovie.backdrop_path}`
                        : `https://insidetrade.co/wp-content/media/2019/04/no-logo.png`}
                    title={singleMovie.title}
                />

                <CardContent className={classes.singleMovieContent}>
                    <Typography variant="h6" color="textPrimary" className={classes.singleMovieTitle}>
                        {singleMovie.title}
                    </Typography>

                    <List component="ul">
                        <ListItem>
                            <ListItemText primary="Дата релиза:" />
                            <ListItemText secondary={singleMovie.release_date} />
                        </ListItem>

                        <ListItem>
                            <ListItemText primary="Бюджет фильма:" />
                            <ListItemText secondary={singleMovie.budget} />
                        </ListItem>

                        <ListItem>
                            <ListItemText primary="Жанр:" />
                            <ListItemText secondary={singleMovie.genres?.map((item: any) => item.name).join(', ')} />
                        </ListItem>

                        <ListItem>
                            <ListItemText primary="Рейтинг:" />
                            <ListItemText secondary={singleMovie.vote_average} />
                        </ListItem>
                    </List>

                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Typography variant="h6" color="textPrimary">
                            Повествование фильма &laquo;{singleMovie.title}&raquo;
                        </Typography>

                        <Typography variant="body1"  >
                            {singleMovie.overview}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Fragment>
    )
}