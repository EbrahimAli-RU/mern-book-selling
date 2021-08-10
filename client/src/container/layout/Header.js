import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { axiosWithAuth } from '../../utils/axios/axiosWithAuth'
import * as action from '../../redux/actions/book'
import * as uiAction from '../../redux/actions/ui'
import DropDown from '../../component/DropDown'

import logo from '../../assets/img/logo.png'
import Icon from '../../assets/img/sprite.svg'
import { Link } from 'react-router-dom'

const Header = (props) => {
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [numberOfWishList, setNumberOfWishList] = useState(0)
    const inputHandler = (e) => {
        props.searchDataHandler(e.target.value)
        props.searchBookHandler(e.target.value, props.url)
    }
    useEffect(() => {
        if (window.location.pathname.split('/')[1] === '')
            setShowSearchBar(true)
        if (props.userId) {
            axiosWithAuth().get(`/user/wishlist/${props.userId}`).then(res => {
                setNumberOfWishList(res.data.data.length)
            }).catch(err => {
                console.log(err.response)
            })
        }
    }, [props.userId, props.wishlist])

    return (
        <header className="header">
            <img src={logo} alt="logo" className="logo" />
            {showSearchBar ? <form action="#" className="search">
                <input type="text"
                    value={props.searchData}
                    onChange={inputHandler}
                    className="search__input"
                    placeholder="Search Books...." />
                <button
                    className="search__button">
                    <svg className="search__icon">
                        <use xlinkHref={`${Icon}#icon-magnifying-glass`}></use>
                    </svg>
                </button>
            </form> : null}
            <nav className='user-menu'>
                <div className="user-nav__icon-menu" >
                    <svg className="user-menu__icon-menu" onClick={props.sideDrawerHandler}>
                        <use xlinkHref={`${Icon}#icon-menu`}></use>
                    </svg>
                    {/* <span className="user-nav__notification">{numberOfWishList}</span> */}
                </div>
            </nav>
            <nav className="user-nav">
                <div className="user-nav__user active">
                    <span className="user-nav__sell-book"><a href='/sell-book'>Sell Book</a></span>
                </div>
                {props.token ? <><Link to='/user/wishlist'>
                    <div className="user-nav__icon-box" >
                        <svg className="user-nav__icon-wishlist">
                            <use xlinkHref={`${Icon}#icon-heart`}></use>
                        </svg>
                        <span className="user-nav__notification">{numberOfWishList}</span>
                    </div>
                </Link>
                    <div className="user-nav__user">
                        <DropDown name={props.userName} />
                        {/* <span className="user-nav__user-name">Jonas</span> */}
                    </div></> : (<div className="user-nav__user">
                        <span className="user-nav__user-login"><a href='/user/login'>SignIn</a></span>
                    </div>)}
            </nav>
        </header>
    )
}
const mapStateToProps = state => {
    return {
        searchData: state.book.searchData,
        url: state.book.url,
        token: state.auth.token,
        userName: state.auth.name,
        userId: state.auth.userId,
        wishlist: state.wishlist.countWishlist
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchDataHandler: (value) => dispatch(action.searchData(value)),
        searchBookHandler: (searchBy, url) => dispatch(action.fetchBook(searchBy, url)),
        sideDrawerHandler: () => dispatch(uiAction.sideDrawerHandler())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);