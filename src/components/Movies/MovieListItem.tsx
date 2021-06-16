import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Movies } from '../../types/types'
import { Link, useParams } from 'react-router-dom'
import { useStyles } from './style'

interface MovieListItemProps {
    movies: Movies
}

export const MovieListItem = (props: MovieListItemProps) => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    className={classes.media}
                    src={`https://image.tmdb.org/t/p/w500${props.movies.backdrop_path || props.movies.poster_path}`}
                    title={props.movies.title}
                />

                <CardContent>
                    <Typography gutterBottom color="primary">
                        <Link to={`/movie/${props.movies.id}`} className={classes.link}>
                            {props.movies.title}
                        </Link>
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                        Рейтинг: {props.movies.vote_average}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}