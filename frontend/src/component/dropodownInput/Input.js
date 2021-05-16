const Input = ({ option, mark, value, handler, name, isDisable }) => {
    return (
        <select id='division'
            className='dropdown__input owner__input__width'
            disabled={isDisable}
            value={value}
            name={name}
            onChange={handler}>
            <option>Select {mark}</option>
            {option.map(el => <option className='dropdown__input-option' key={el}>{el}</option>)}
        </select>
    )
}

export default Input;