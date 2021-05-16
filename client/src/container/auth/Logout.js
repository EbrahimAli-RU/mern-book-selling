import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as action from '../../redux/actions/auth'
import { Redirect } from 'react-router-dom'

const Logout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.authLogout())
    }, [])

    return <Redirect to='/' />
}

export default Logout;