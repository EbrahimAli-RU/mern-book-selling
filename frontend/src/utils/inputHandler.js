import { validate } from './validation/validation'

export const userInputHandler = (ev, obj) => {
    const { name, value } = ev.target
    const validationresult = validate(name, value)
    const newObj = { ...obj }
    newObj[name].value = value
    newObj[name].error = validationresult.error
    newObj[name].message = validationresult.message
    return newObj
}