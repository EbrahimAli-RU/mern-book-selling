import BackDrop from './BackDrop'
const SideDrawer = (props) => {
    let addClass = ''
    if (props.show && props.showLeft)
        addClass = 'side__drawer left'
    else if (!props.show && props.showLeft)
        addClass = 'side__drawer leftclose'
    else if (props.show && !props.showLeft)
        addClass = 'side__drawer right'
    return (
        <>
            <BackDrop show={props.show} handler={props.backDropHandler} />
            <div className={addClass} >{props.children}</div>
        </>
    )
}

export default SideDrawer;

// style =
//     {{
//     right: show ? '0' : '-100%'
// }}