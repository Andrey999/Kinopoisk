import { MoviesActions } from '.'
import { API_URL, API_KEY_3 } from '../../api/api'
import { fetchApi } from '../../utils/fetchApi'
import { store } from '../store'

export default {
    // запрос на получение фильмов
    moviesRequest() {
        return {
            type: 'MOVIES_REQUEST'
        }
    },

    //  получение фильмов
    moviesLoadedThunk() {
        return async (dispatch: any) => {
            try {
                const { movies } = store.getState()
                dispatch(MoviesActions.moviesRequest())
                const movie = await fetchApi(`${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${movies.sort_by}&page=${movies.page}&primary_release_year=${movies.primary_release_year}&with_genres=${movies.with_genres}`)
                dispatch({
                    type: 'MOVIES_SUCCESS',
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
            const genres = await fetchApi(`${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`)
            return dispatch({
                type: 'GENRES_SUCCESS',
                payload: genres.genres
            })
        }
    },

    // ошибка
    moviesError(error: any) {
        return {
            type: 'MOVIES_ERROR',
            payload: error
        }
    },

    //////////////// Filters
    changeFilters(name: any, value: any) {
        return {
            type: 'CHANGE_FILTERS',
            payload: { name, value }
        }
    },

    setPage(page: any) {
        return {
            type: 'SET_PAGE',
            payload: page
        }
    }

}