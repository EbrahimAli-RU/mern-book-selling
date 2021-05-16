const DropDown = (props) => {
    return (
        <div className="dropdown">
            <button className="dropdown-btn">{props.name}</button>
            <div className="dropdown-content">
                <a href="/own-book">Own Books</a>
                <a href="/logout">Logout</a>
            </div>
        </div>
    )
}

export default DropDown;