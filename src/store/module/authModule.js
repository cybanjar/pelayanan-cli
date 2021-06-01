export default {
    state() {
        return {
            user: {},
            isAuth: false,
            credential: '',
            username: ''
        }
    },
    mutations: {
        
        setUsername(state, user) {
            state.user = user
        },
    },
    getters: {

    },
    actions: {

    }
}

