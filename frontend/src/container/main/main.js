import React, { useState, useEffect } from 'react'
import Card from '../../component/card/card'
import SideBar from '../layout/Sidebar'
import { connect } from 'react-redux'
import { axiosWithAuth } from '../../utils/axios/axiosWithAuth'
import Error from '../../component/error/Error'
import * as action from '../../redux/actions/book'
import * as wishlistAction from '../../redux/actions/wishlist'
import * as uitAction from '../../redux/actions/ui'
import { Spinner } from 'reactstrap'
import SideDrawer from '../../component/SideDrawer'
import Icon from '../../assets/img/sprite.svg'
import Sidebar from '../layout/Sidebar'
import Footer from '../layout/Footer'
import Header from '../layout/Header'

const data = {
    error: false,
    message: 'Added to Wishlist'
}

const Main = (props) => {
    const [isError, setIsError] = useState(data)
    useEffect(() => { props.searchBookHandler(props.searchData) }, [])

    const addToWishlistHandler = (id, photo, title, price) => {
        axiosWithAuth().post('/user/wishlist', { photo, title, price, bookId: id }).then(res => {
            props.handleWishlist();
            setIsError({ error: true, message: res.data.data.message })
            setTimeout(() => { setIsError({ error: false, message: '' }) }, 1000)
        }).catch(err => {
            setTimeout(() => { setIsError({ error: false, message: '' }) }, 1000)
            setIsError({ error: true, message: err.response.data.message })
        })
    }

    const closeErrorhandler = () => { setIsError(false) }

    let books
    if (props.loading === true) {
        books = <div className='spinner__container'><Spinner color='primary' className='spinner' /></div>
    }
    else if (props.books.length !== 0) {
        let gBook = props.books
        if (props.searchData.length === 0) {
            gBook = props.books.slice(0, 10)
        }
        books = gBook.map(el =>
            <Card photo={el.coverphoto}
                id={el._id} key={el._id}
                title={el.bookName}
                price={el.price}
                handler={(id, photo, title, price) =>
                    addToWishlistHandler(id, photo, title, price)} />)
    } else if (props.books.length === 0 && props.firstTime === false) {
        books = <p className='result__not__found'>No Search result found</p>
    }
    return (
        <>
            <Header />
            <div className='content'>
                <SideDrawer show={props.showFilterSideDrawer}
                    showLeft={false}
                    backDropHandler={props.handleFilterSideDrawer}>
                    <div className='sidebar-filter' style={{ display: props.showFilterSideDrawer ? 'block' : 'none' }}>
                        <Sidebar />
                    </div>

                </SideDrawer>
                <div className='filter__holder'>
                    <div className="user-nav__icon-box" style={{ left: '2rem', top: '1rem' }} onClick={props.handleFilterSideDrawer}>
                        <svg className="user-nav__icon-filter">
                            <use xlinkHref={`${Icon}#icon-funnel`}></use>
                        </svg>
                    </div>
                </div>
                <Error show={isError.error}
                    message={isError.message}
                    handler={closeErrorhandler} />
                <div className='sidebar'>
                    <SideBar />
                </div>
                <main className='cards__container'>
                    {books}
                </main>
            </div>
            <Footer />
        </>
    )
}
const mapStateToProps = state => {
    return {
        books: state.book.books,
        firstTime: state.book.isFirstTime,
        loading: state.book.loading,
        searchData: state.book.searchData,
        showSideDrawer: state.ui.sideDrawer,
        showFilterSideDrawer: state.ui.filterSideDrawer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchBookHandler: (searchBy, url) => dispatch(action.fetchBook(searchBy, url)),
        handleWishlist: () => dispatch(wishlistAction.addToWishlist()),
        handleSideDrawer: () => dispatch(uitAction.sideDrawerHandler()),
        handleFilterSideDrawer: () => dispatch(uitAction.filterSideDrawerHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);