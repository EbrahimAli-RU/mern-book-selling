import * as actionType from './actionTypes'
import axios from '../../utils/axios/axios'

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
}

export const authSuccess = (userId, token, name) => {
    return {
        type: actionType.AUTH_SUCCESS,
        userId: userId,
        token: token,
        name
    }
}

export const authFail = (error, signup, signin) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error,
        signup,
        signin
    }
}


export const auth = (formData, url, propsPro) => {
    let signup = false, signin = false
    url === '/user/signup' ? signup = true : signup = false
    url === '/user/signin' ? signin = true : signin = false
    return (dispatch) => {
        dispatch(authStart())
        axios.post(url, { ...formData }).then(res => {
            if (res.data.status === 'success') {
                dispatch(authSuccess(res.data.data.user._id, res.data.data.token, res.data.data.user.userName))
                localStorage.setItem('token', res.data.data.token)
                localStorage.setItem('userId', res.data.data.user._id)
                localStorage.setItem('userName', res.data.data.user.userName)
                if (url === '/user/signup') {
                    propsPro.history.push('/');
                } else if (url === '/user/signin') {
                    propsPro.history.goBack();
                }
            }
        }).catch(err => {
            dispatch(authFail(err.response.data, signup, signin))
            dispatch(authLogout())
        })
    }
}

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    return {
        type: actionType.AUTH_LOGOUT
    }
}

export const checkAuthState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(authLogout());
        } else {
            const userId = localStorage.getItem("userId");
            const name = localStorage.getItem('userName')
            dispatch(authSuccess(userId, token, name));
        }
    };
};