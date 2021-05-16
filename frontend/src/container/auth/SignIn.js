import React, { useState } from 'react'
import Input from '../../component/authInput/AuthInput'
import Button from '../../component/PrimaryButton'
import { userInputHandler } from '../../utils/inputHandler'
import * as action from '../../redux/actions/auth'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { signinObj, validate } from './authUtils'

const SignIn = (props) => {
    const [loginData, setLoginData] = useState(signinObj)
    const [disabled, setDisabled] = useState(true)

    const inputHandler = (e) => {
        const newData = userInputHandler(e, loginData)
        validate(loginData, setDisabled)
        setLoginData(newData);
    }
    const loginHandler = (e) => {
        e.preventDefault();
        props.submitHandler({ email: loginData.email.value, password: loginData.password.value }, '/user/signin', props)
        console.log(loginData);
    }
    if (props.error && props.signin) {
        console.log(props.error.message)
        loginData.email.error = true
        loginData.email.message = props.error.message
        loginData.password.error = true
        loginData.password.message = props.error.message
    }
    return (
        <div className='auth__container'>
            <h2 className='auth__container-title'>sign In</h2>
            <Input type='text'
                value={loginData.email.value}
                error={loginData.email.error}
                message={loginData.email.message}
                handler={inputHandler}
                name='email'
                placeholder='E-Mail' />
            <Input type='password'
                value={loginData.password.value.value}
                error={loginData.password.error}
                message={loginData.password.message}
                handler={inputHandler}
                name='password'
                placeholder='Password' />
            {/* <input className='auth__container-remember' type='checkbox' /> Remember me */}
            <Link className='auth__container-forgot' to='/'> forgot password?</Link>
            <Button handler={loginHandler} buttonText='log in' isDisable={props.loading || disabled} />
            <p className='auth__question'>New Member? <Link to='/user/signup'> Sign up</Link></p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        signin: state.auth.signin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitHandler: (formData, url, propsPro) => dispatch(action.auth(formData, url, propsPro))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));