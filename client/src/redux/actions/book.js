import * as actionTypes from './actionTypes'
import axios from '../../utils/axios/axios'

export const searchData = (data) => {
    return {
        type: actionTypes.SEARCH_DATA,
        data
    }
}

export const startBookFetching = () => {
    return {
        type: actionTypes.FETCH_BOOKS_START
    }
}

export const failBookFetching = () => {
    return {
        type: actionTypes.FETCH_BOOKS_FAIL
    }
}

export const successBookFetching = (data) => {
    return {
        type: actionTypes.FETCH_BOOK_SUCCESS,
        book: data
    }
}

export const setUrl = url => {
    return {
        type: actionTypes.SETURL,
        url
    }
}

export const fetchBook = (searchBy = '', filter = '') => {
    let fullUrl = `/book?slug=${searchBy}`.concat(filter);
    return dispatch => {
        dispatch(startBookFetching())
        axios.get(fullUrl).then(res => {
            console.log(res)
            dispatch(successBookFetching(res.data.data.books));
        }).catch(err => {
            dispatch(failBookFetching(err))
        })
    }
}