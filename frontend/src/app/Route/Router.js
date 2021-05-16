import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SideDrawer from '../../component/SideDrawer'
import * as uitAction from '../../redux/actions/ui'
import Icon from '../../assets/img/sprite.svg'

const Router = (props) => {
    return (
        <>
            <SideDrawer show={props.showSideDrawer}
                showLeft={true}
                backDropHandler={props.handleSideDrawer}>
                <nav className="sidebar-insidesidedreawer">
                    <ul className="side__nav" onClick={props.handleSideDrawer}>
                        <li className="side__nav__item side__nav__item--active">
                            <a href="/" className="side__nav__link">
                                <svg className="side__nav__icon">
                                    <use xlinkHref={`${Icon}#icon-home`}></use>
                                </svg>
                                <span>Home</span>
                            </a>
                        </li>
                        <li className="side__nav__item">
                            <a href="/sell-book" className="side__nav__link">
                                <svg className="side__nav__icon">
                                    <use xlinkHref={`${Icon}#icon-menu`}></use>
                                </svg>
                                <span>Sell Book</span>
                            </a>
                        </li>
                        {props.token ? <>
                            <li className="side__nav__item">
                                <Link to="/user/wishlist" className="side__nav__link">
                                    <svg className="side__nav__icon">
                                        <use xlinkHref={`${Icon}#icon-heart`}></use>
                                    </svg>
                                    <span>wish list</span>
                                </Link>
                            </li>
                            <li className="side__nav__item">
                                <Link to="/own-book" className="side__nav__link">
                                    <svg className="side__nav__icon">
                                        <use xlinkHref={`${Icon}#icon-menu`}></use>
                                    </svg>
                                    <span>own book</span>
                                </Link>
                            </li>
                            <li className="side__nav__item">
                                <Link to="/logout" className="side__nav__link">
                                    <svg className="side__nav__icon">
                                        <use xlinkHref={`${Icon}#icon-menu`}></use>
                                    </svg>
                                    <span>log out</span>
                                </Link>
                            </li>
                        </> : <>
                            <li className="side__nav__item">
                                <a href="/user/login" className="side__nav__link">
                                    <svg className="side__nav__icon">
                                        <use xlinkHref={`${Icon}#icon-menu`}></use>
                                    </svg>
                                    <span>Sign in</span>
                                </a>
                            </li>
                        </>}
                    </ul>
                </nav>
            </SideDrawer>
        </>
    )
}
const mapStateToProps = state => {
    return {
        showSideDrawer: state.ui.sideDrawer,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSideDrawer: () => dispatch(uitAction.sideDrawerHandler()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);