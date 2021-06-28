import Card from '../../component/WishlistCard'
import { axiosWithAuth } from '../../utils/axios/axiosWithAuth'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'reactstrap'
import Popup from '../../component/Popup'
import { Link, Redirect } from 'react-router-dom'

const OwnBook = (props) => {
    const [wishlistData, setWishlistData] = useState({ wishlist: [], loading: true })
    const [showpopup, setShowPopup] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    useEffect(() => {
        if (props.userId) {
            axiosWithAuth().get(`/book/${props.userId}/ownBooks`).then(res => {
                setWishlistData({ wishlist: res.data.data.books, loading: false })
            }).catch(err => {
                console.log(err)
                setWishlistData({ wishlist: wishlistData.wishlist, loading: false })
                console.log(err)
            })
        }
        return () => {
            setWishlistData({ wishlist: [], loading: true })
        }
    }, [props.userId])

    const deleteHandler = () => {
        axiosWithAuth().delete(`/book/${deleteId}`).then(res => {
            let copyWishlistData = { ...wishlistData }
            copyWishlistData.wishlist = copyWishlistData.wishlist.filter(el => el._id !== deleteId);
            copyWishlistData.loading = false
            setWishlistData(copyWishlistData)
            setDeleteId(null)
            setShowPopup(false)
        }).catch(err => {
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
                name={el.bookName}
                handler={(id) => openPopupHandler(id)}
                id={el._id}
                ownId={el._id}
                price={el.price}
                photo={el.coverphoto.data}
                show />)

    } else if (wishlistData.wishlist.length === 0 && wishlistData.loading === false) {
        wishLists = <div className='wishlist__empty'>
            <p className='wishlist__empty-header'>Nothing in SeLL</p>
            <Link to='/'><button className='butn' id='continue'>Go For SeLL</button></Link>
        </div>
    }

    return (
        <>
            <Popup show={showpopup} closeHandler={closePopupHandler} deleteHandler={deleteHandler} />
            <div id='wishlist'>
                <h1 className='wishlist__heading'>Book</h1>
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

export default connect(mapStateToProps)(OwnBook)