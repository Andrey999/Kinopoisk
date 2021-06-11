


export default {

    getAuth(payload: any) {
        return {
            type: 'AUTH',
            payload
        }
    },

    logOut() {
        return {
            type: 'LOG_OUT'
        }
    }
}