import Card from '../../component/WishlistCard'
import { axiosWithAuth } from '../../utils/axios/axiosWithAuth'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'reactstrap'
import Popup from '../../component/Popup'
import { Link } from 'react-router-dom'
import * as action from '../../redux/actions/wishlist'

const Wishlist = (props) => {
    const [wishlistData, setWishlistData] = useState({ wishlist: [], loading: true })
    const [showpopup, setShowPopup] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    useEffect(() => {
        if (props.userId) {
            axiosWithAuth().get(`/user/wishlist/${props.userId}`).then(res => {
                setWishlistData({ wishlist: res.data.data, loading: false })
            }).catch(err => {
                setWishlistData({ wishlist: wishlistData.wishlist, loading: false })
            })
        }
        return () => {
            setWishlistData({ wishlist: [], loading: true })
        }
    }, [props.userId])

    const deleteHandler = () => {
        axiosWithAuth().delete(`/user/wishlist/${deleteId}`).then(res => {
            props.handleWishlist();
            console.log(res.data.data)
            let copyWishlistData = { ...wishlistData }
            copyWishlistData.wishlist = copyWishlistData.wishlist.filter(el => el._id !== deleteId);
            copyWishlistData.loading = false
            setWishlistData(copyWishlistData)
            console.log(copyWishlistData);
            setDeleteId(null)
            setShowPopup(false)
        }).catch(err => {
            console.log(err.response)
            setDeleteId(null)
            setShowPopup(false)
        })
    }

    const openPopupHandler = (id) => {
        setShowPopup(true)
        setDeleteId(id)
    }

    const closePopupHandler = () => {
        setShowPopup(false)
        setDeleteId(null)
    }

    let wishLists = <div className='spinner__container'><Spinner color='primary' className='spinner' /></div>
    if (wishlistData.wishlist.length > 0) {
        wishLists = wishlistData.wishlist.map(el =>
            <Card key={el._id}
                name={el.title}
                handler={(id) => openPopupHandler(id)}
                ownId={el._id}
                id={el.bookId}
                price={el.price}
                photo={el.photo}
                show={false} />)
    } else if (wishlistData.wishlist.length === 0 && wishlistData.loading === false) {
        wishLists = <div className='wishlist__empty'>
            <p className='wishlist__empty-header'>Nothing in Your WishList</p>
            <Link to='/'><button className='butn' id='continue'>Continue Shoping</button></Link>
        </div>
    }

    return (
        <>
            <Popup show={showpopup} closeHandler={closePopupHandler} deleteHandler={deleteHandler} />
            <div id='wishlist'>
                <h1 className='wishlist__heading'>WISHLIST</h1>
                {wishLists}
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        handleWishlist: () => dispatch(action.removeFromWishlist())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)