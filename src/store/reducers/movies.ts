import { MOVIES_REQUEST, MOVIES_SUCCESS, MOVIES_ERROR, GENRES_SUCCESS, CHANGE_FILTERS, SET_PAGE } from '../constants'

const initialState = {
    load: false,
    movies: [],
    error: null,
    genre: [],

    // filters
    sort_by: 'popularity.desc',
    primary_release_year: '2018',
    with_genres: [],
    page: 1
}

export const moviesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case MOVIES_REQUEST:
            return {
                ...state
            }

        case MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.payload
            }

        case GENRES_SUCCESS:
            return {
                ...state,
                genre: action.payload
            }

        case MOVIES_ERROR:
            return {
                ...state,
                movies: [],
                error: action.payload
            }

        case CHANGE_FILTERS:
            const name = action.payload.name
            const value = action.payload.value
            return {
                ...state,
                [name]: value
            }

        case SET_PAGE:
            return {
                ...state,
                page: action.payload
            }

        default: return state
    }
}