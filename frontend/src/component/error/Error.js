const Error = ({ show, message }) => {
    return (
        <div className='error' style={{
            left: show ? '5rem' : '-50rem'
        }}><p className='error__message'>{message}</p></div>
    )
}

export default Error