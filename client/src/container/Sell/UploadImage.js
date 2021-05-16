import React from 'react'

const ImageUploder = ({ buttonTitle, inputName, handler, isMultiple }) => {
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        event.preventDefault();
        hiddenFileInput.current.click()
    }
    return (
        <>
            <button className='btn coverPhoto' onClick={handleClick}>{buttonTitle}</button>
            <input ref={hiddenFileInput}
                style={{ display: 'none' }}
                type='file'
                multiple={isMultiple}
                name={inputName}
                onChange={handler} />
        </>
    );
}

export default ImageUploder