import { Link } from 'react-router-dom'
import Icon from '../assets/img/sprite.svg'

const WishlistCard = ({ name, price, photo, id, handler, ownId, show }) => {
    return (
        <div className='wishlist__content'>
            <img src={`data:image/png;base64, ${new Buffer.from(photo).toString("base64")}`} alt='book' className='wishlist__photo' />
            <div className='wishlist__info'>
                <p>{name.length < 45 ? `${name}` : `${name.substr(0, 42)}...`}</p>
                <p>{price}</p>
            </div>
            <div className='wishlist__action-icon'>
                <div className="user-nav__icon-box" onClick={() => handler(ownId)} >
                    <svg className="user-nav__icon-delete">
                        <use xlinkHref={`${Icon}#icon-trash`}></use>
                    </svg>
                    <span >delete</span>
                </div>
                <Link to={`/detail/${id}`}><div className="user-nav__icon-box" >
                    <svg className="user-nav__icon-delete">
                        <use xlinkHref={`${Icon}#icon-info-with-circle`}></use>
                    </svg>
                    <span>detail</span>
                </div></Link>
                {show ? <Link to={`/update/${id}`}><div className="user-nav__icon-box" >
                    <svg className="user-nav__icon-delete">
                        <use xlinkHref={`${Icon}#icon-edit`}></use>
                    </svg>
                    <span>edit</span>
                </div></Link> : null}
            </div>
        </div>
    )
}

export default WishlistCard