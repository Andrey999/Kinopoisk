export const API_URL = 'https://api.themoviedb.org/3'
export const API_KEY_3 = '688e62ad45f5d9b5665e1e57506c7314'
export const API_KEY_4 = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODhlNjJhZDQ1ZjVkOWI1NjY1ZTFlNTc1MDZjNzMxNCIsInN1YiI6IjYwYjVkYjI2N2Q1NTA0MDA0MGVlMTgwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kuEBefEC_s5L_UlKqx9N8gskGtpsKfwuzNrR5dtehCU'


export const fetchApi = async (url: string, options?: {}) => {
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
