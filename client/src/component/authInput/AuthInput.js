const Input = (props) => {
    return (
        <div className='input__container' data-error={props.error ? props.message : null} >
            <p>{props.placeholder}*</p>
            <input className='input__container__auth-input'
                type={props.type}
                value={props.value}
                name={props.name}
                onChange={props.handler}
                placeholder={props.placeholder} />
        </div>
    )
}

export default Input