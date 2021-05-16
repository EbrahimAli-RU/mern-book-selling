import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axios/axiosWithAuth'
import { sellBook, inputHandler, toggleTab } from './Sell/util'
import { withRouter } from 'react-router'
import { Spinner } from 'reactstrap'
import UI from './Sell/UI'
import Header from './layout/Header'
import Footer from './layout/Footer'

const data = {
    region: [],
    city: [],
    area: []
}
const errorData = {
    error: false,
    message: ''
}

const EditBook = (props) => {
    const [bookData, setBookData] = useState(sellBook);
    const [filterData, setFilterData] = useState(data)
    const [toggleState, setToggleState] = useState(1)
    const [isError, setIsError] = useState(errorData)
    const [id, setId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingUpdate, setLoadingUpdate] = useState(false)

    const getLocation = (name, value) => {
        let selectFil = ''
        if (name === 'region') selectFil = 'city'
        else if (name === 'city') selectFil = 'area'
        axiosWithAuth().get(`/filter?area=${value}&filterType=${name}`).then(res => {
            const newFilterData = { ...filterData }
            if (value === 'Select' || res.data.data.length === 0) {
                newFilterData[selectFil] = res.data.data
            } else {
                if (newFilterData[selectFil].length === 0) {
                    res.data.data[0].allArea.forEach(element => {
                        newFilterData[selectFil].push(element)
                    });
                } else { }

            }
            setFilterData(newFilterData)
        }).catch(err => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        const bookId = window.location.pathname.split('/')[2];
        axiosWithAuth().get(`/book/${bookId}`).then(res => {
            for (let key in res.data.data) {
                if (key === 'region' || key === 'city') {
                    getLocation(key, res.data.data[key])
                } else if (key === 'coverphoto') {
                    bookData['coverphoto1'] = ''
                    bookData['photos1'] = []
                } else if (key === 'missingPage') {
                    if (res.data.data[key] !== 'no') {
                        bookData['missingPageYes'] = res.data.data[key]
                    }
                }
                bookData[key] = res.data.data[key]
            }
            console.log(bookData)
            setLoading(false)
            setId(res.data.data._id)
        }).catch(err => {
            setLoading(false)
            console.log(err)
        })
    }, [])

    const handleInput = (e) => {
        inputHandler(e, bookData, setBookData, filterData, setFilterData)
    }

    const toggle = (tab) => {
        toggleTab(toggleState, tab, setToggleState, bookData, `/book/${id}`, 'patch', props, setIsError, setLoadingUpdate)
    }

    return (
        <>
            <Header />
            {loadingUpdate ? <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: '200', left: '0', top: '0', backgroundColor: 'rgba(0,0,0,.2' }}>
                <div className='spinner__container'><Spinner color='danger' className='spinner' /></div>
            </div> : null
            }
            {loading ? <div style={{ width: '100%', height: '80vh' }}>
                <div className='spinner__container'><Spinner color='primary' className='spinner' /></div>
            </div> :
                <UI
                    toggleState={toggleState}
                    bookData={bookData}
                    filterData={filterData}
                    inputHandler={handleInput}
                    toggleTab={(tab) => toggle(tab)} />}
            <Footer />
        </>

    )
}

export default withRouter(EditBook)