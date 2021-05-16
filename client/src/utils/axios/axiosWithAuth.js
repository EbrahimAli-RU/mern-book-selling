import axios from 'axios'
export const getToken = () => {
    const token = localStorage.getItem('token')
    return token
}

export const axiosWithAuth = () => {
    const instance = axios.create({
        baseURL: `https://mern-book-selling.herokuapp.com:8000/api/v1`,
    })

    instance.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
    return instance;
}