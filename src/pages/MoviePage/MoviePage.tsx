import React, { useState, useEffect } from 'react'
import { fetchApi } from '../../utils/fetchApi'
import { API_URL, API_KEY_3 } from '../../api/api'
import { Link, useParams } from 'react-router-dom'

export const MoviePage = () => {
    let params = useParams();
    const movie = 
    console.log(params)

    // useEffect(() => {
        // fetchApi(`${API_URL}/movie/${params.id}?api_key=${API_KEY_3}&&language=ru-RU`)
    // }, [])

    return (
        <div>
            Movie
        </div>
    )
};