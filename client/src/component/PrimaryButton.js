const PrimaryButton = ({ handler, buttonText, isDisable }) => {
    return (
        <button onClick={handler}
            className='butn'
            disabled={isDisable} >
            {buttonText}</button>
    )
}

export default PrimaryButton;