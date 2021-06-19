export const fetchApi = async (url: string, options?: {}) => {
    try {
        const response = await fetch(url, options)
        if (response.status < 400) {
            const data = await response.json()
            return data
        }
        else {
            throw response
        }
    } catch (error) {
        return await error.json()
    }
    //     fetch(url, options)
    //         .then(response => {
    //             if (response.status < 400) {
    //                 return response.json()
    //             } else {
    //                 throw response
    //             }
    //         })
    //         .then(data => resolve(data))
    //         .catch(response => {
    //             response.json().then((err: any) => reject(err))
    //         })
    // })
}