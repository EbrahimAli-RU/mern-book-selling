export const validate = (name, value) => {
    switch (name) {
        case 'email':
            return emailValidation(value);
        case 'password':
            return dataValidation(value, 8)
        case 'confirmPassword':
            return dataValidation(value, 8)
        case 'userName':
            return dataValidation(value, 3)
        default:
            return {
                error: true,
                message: 'Try It'
            }

    }
}


export const emailValidation = (mail) => {
    if (mail.length === 0) {
        return {
            error: true,
            message: 'This field is required'
        }
    } else {
        if (validateEmail(mail)) {
            return {
                error: false,
                message: ''
            }
        } else {
            return {
                error: true,
                message: 'Not an email,Please provide valid one!'
            }
        }
    }
}

export const dataValidation = (password, len) => {
    if (password.length === 0) {
        return {
            error: true,
            message: 'This field is required'
        }
    } else if (password.length < len) {
        return {
            error: true,
            message: `Min ${len} charecter`
        }
    } else {
        return {
            error: false,
            message: ''
        }
    }
}


export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}