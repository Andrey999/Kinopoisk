import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: '350px',
        maxWidth: 350,
        marginBottom: '10px',
        minHeight: '200px'
    },
    media: {
        height: 140,
    },
});

interface MovieListItemProps {
    movies: any
}

export const MovieListItem = (props: MovieListItemProps) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>     
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`https://image.tmdb.org/t/p/w500${props.movies.backdrop_path || props.movies.poster_path}`}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.movies.title}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        Рейтинг: {props.movies.vote_average}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}