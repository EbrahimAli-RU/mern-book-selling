import React, { useState } from 'react'
import Button from '../../component/PrimaryButton'
import Input from '../../component/authInput/AuthInput'
import { userInputHandler } from '../../utils/inputHandler'
import * as action from '../../redux/actions/auth'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { signupObj, validate } from './authUtils'


const SignUp = (props) => {
    const [signupData, setSignupData] = useState(signupObj)
    const [disabled, setDisabled] = useState(true)

    const inputHandler = (e) => {
        const newData = userInputHandler(e, signupData)
        validate(signupData, setDisabled)
        setSignupData(newData)
    }

    const signupHandler = (e) => {
        e.preventDefault();
        props.submitHandler({
            userName: signupData.userName.value,
            email: signupData.email.value,
            password: signupData.password.value,
            confirmPassword: signupData.confirmPassword.value,
        }, '/user/signup', props)
    }

    const cleanup = () => {
        for (let key in signupData) {
            signupData[key].error = false
            signupData[key].message = ''
        }
    }
    if (props.error && props.signup) {
        if (props.error.message === ` Confirm password is not same as password`) {
            signupData.password.error = true
            signupData.password.message = props.error.message
        } else if (props.error.status === 'fail') {
            signupData.email.error = true
            signupData.email.message = props.error.message
        }
        setTimeout(() => { cleanup() }, 500)
    }
    return (
        <div className='auth__container'>
            <h2 className='auth__container-title'>sign Up</h2>
            <Input type='text' value={signupData.userName.value} error={signupData.userName.error} message={signupData.userName.message} handler={inputHandler} name='userName' placeholder='User Name' />
            <Input type='text' value={signupData.email.value} error={signupData.email.error} message={signupData.email.message} handler={inputHandler} name='email' placeholder='E-Mail' />
            <Input type='password' value={signupData.password.value} error={signupData.password.error} message={signupData.password.message} handler={inputHandler} name='password' placeholder='Password' />
            <Input type='password' value={signupData.confirmPassword.value} error={signupData.confirmPassword.error} message={signupData.confirmPassword.message} handler={inputHandler} name='confirmPassword' placeholder='Confirm Password' />
            <Button handler={signupHandler} buttonText='Sign up' />
            <p className='auth__question'>Already have Account? <Link to='/user/login'> login</Link></p>

        </div>

    )
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        signup: state.auth.signup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitHandler: (formData, url, props) => dispatch(action.auth(formData, url, props))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));