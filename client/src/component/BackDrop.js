
const BackDrop = ({ show, handler }) => {
    return (
        <div style={{
            display: show ? 'block' : 'none'
        }} className='backdrop' onClick={handler}></div>
    )
}

export default BackDrop;