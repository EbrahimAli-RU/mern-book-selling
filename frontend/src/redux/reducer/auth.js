const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    name: '',
    signin: false,
    signup: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'AUTH__START':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'AUTH_SUCCESS':
            return {
                ...state,
                userId: action.userId,
                token: action.token,
                name: action.name,
                loading: false,
                error: null
            }
        case 'AUTH_FAIL':
            return {
                ...state,
                loading: false,
                error: action.error,
                userId: null,
                token: null,
                signup: action.signup,
                signin: action.signin
            }
        case 'AUTH_LOGOUT':
            return {
                ...state,
                userId: null,
                token: null,
                error: null
            }
        default:
            return state
    }
}

export default reducer