import axios from 'axios'

const instance = axios.create({
    baseURL: `https://mern-book-selling.herokuapp.com:8000/api/v1`,
    // withCredentials: true,
    // credentials: 'include'
})

export default instance