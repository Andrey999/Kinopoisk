import { MOVIES_REQUEST, MOVIES_SUCCESS, MOVIES_ERROR, GENRES_SUCCESS, CHANGE_FILTERS, SET_PAGE } from '../constants'
import { MoviesActions } from './index'
import { CallApi } from '../../api/fetchApi'
import { store } from '../store'

export default {
    // запрос на получение фильмов
    moviesRequest() {
        return {
            type: MOVIES_REQUEST
        }
    },

    //  получение фильмов
    moviesLoadedThunk() {
        return async (dispatch: any) => {
            try {
                const { movies } = store.getState()
                dispatch(MoviesActions.moviesRequest())
                const movie = await CallApi.get(`/discover/movie`, {
                    params: {
                        language: "ru-RU",
                        sort_by: movies.sort_by,
                        page: movies.page,
                        primary_release_year: movies.primary_release_year,
                        with_genres: movies.with_genres
                    }
                })
                dispatch({
                    type: MOVIES_SUCCESS,
                    payload: movie.results
                })
            } catch (err) {
                dispatch(MoviesActions.moviesError(err))
            }
        }
    },

    // получение жанров
    genresLoadedThunk() {
        return async (dispatch: any) => {
            const genres = await CallApi.get(`/genre/movie/list`, {
                params: {
                    language: "ru-RU",
                }
            })
            return dispatch({
                type: GENRES_SUCCESS,
                payload: genres.genres
            })
        }
    },

    // ошибка
    moviesError(error: any) {
        return {
            type: MOVIES_ERROR,
            payload: error
        }
    },

    // изменение фильтров
    changeFilters(name: any, value: any) {
        return {
            type: CHANGE_FILTERS,
            payload: { name, value }
        }
    },

    // изменение страницы
    setPage(page: any) {
        return {
            type: SET_PAGE,
            payload: page
        }
    }

}