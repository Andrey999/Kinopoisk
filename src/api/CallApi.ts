import queryString from 'query-string'

const API_URL = 'https://api.themoviedb.org/3'
const API_KEY_3 = '688e62ad45f5d9b5665e1e57506c7314'
const API_KEY_4 = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODhlNjJhZDQ1ZjVkOWI1NjY1ZTFlNTc1MDZjNzMxNCIsInN1YiI6IjYwYjVkYjI2N2Q1NTA0MDA0MGVlMTgwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kuEBefEC_s5L_UlKqx9N8gskGtpsKfwuzNrR5dtehCU'


const fetchApi = async (url: string, options?: {}) => {
    try {
        const response = await fetch(url, options)
        if (response.status < 400) {
            const data = await response.json()
            return data
        } else {
            throw response
        }

    } catch (error) {
        return await error.json()
    }
}

export class CallApi {
    static get(url: string, options: any) {
        const { params = {} } = options
        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        }

        return fetchApi(`${API_URL}${url}?&${queryString.stringify(queryStringParams)}`, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
        })
    }

    static post(url: string, options: any = {}) {
        const { params, body } = options
        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        }

        return fetchApi(`${API_URL}${url}?&${queryString.stringify(queryStringParams)}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body
        })
    }

    static delete(url: string, options: any = {}) {
        const { body } = options
        const queryStringParams = {
            api_key: API_KEY_3
        }

        return fetchApi(`${API_URL}${url}?&${queryString.stringify(queryStringParams)}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body
        })
    }
}
