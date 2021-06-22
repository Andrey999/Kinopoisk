import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { MoviesActions } from '../../store/actions'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { SingleMovie } from '../../components/Movies/SingleMovie'

export const MoviePage = () => {
    let params = useParams()
    return (
        <Container>
                <SingleMovie params={params} />
        </Container>
    )
};