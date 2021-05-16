const Input = ({ type, placeholder, name, isRequired, value, handler }) => {
    return (
        <div className='form__group'>
            <input className='form__input'
                type={type}
                placeholder={placeholder}
                id={name}
                value={value}
                onChange={handler}
                required={isRequired}
                name={name} />
            <label htmlFor={name} className='form__label'>{placeholder}</label>
        </div>
    )
}

export default Input