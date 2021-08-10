export const validate = (obj, setDisabled) => {
    let flag = 0
    for (let key in obj) {
        if (obj[key].value !== '' && obj[key].error === false) {
            flag = 1
        } else {
            flag = 0
            break;
        }
    }
    flag === 1 ? setDisabled(false) : setDisabled(true)
}
export const signupObj = {
    userName: {
        value: '',
        error: false,
        message: ''
    },
    email: {
        value: '',
        error: false,
        message: ''
    },
    password: {
        value: '',
        error: false,
        message: ''
    },
    confirmPassword: {
        value: '',
        error: false,
        message: ''
    }
}

export const signinObj = {
    email: {
        value: '',
        error: false,
        message: ''
    },
    password: {
        value: '',
        error: false,
        message: ''
    },
}