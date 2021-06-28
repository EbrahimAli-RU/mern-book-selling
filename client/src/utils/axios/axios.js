import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? `http://localhost:8000/api/v1` : `/api/v1`,

})

export default instance