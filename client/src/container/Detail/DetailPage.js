import React, { useState, useEffect } from 'react'
import axios from '../../utils/axios/axios'
import Photo from './Photo'
import Book from './Book'
import Owner from './Owner'
import Footer from '../layout/Footer'
import Header from '../layout/Header'
import { Spinner, Alert, UncontrolledAlert } from 'reactstrap'

const DetailPage = () => {
    const bookId = window.location.pathname.split('/')[2];
    const [detailData, setDetailData] = useState(null)
    const [toggleState, setToggleState] = useState(1);
    const [error, setError] = useState({ error: false, message: '' })

    const toggleTab = (index) => {
        setToggleState(index);
    };
    useEffect(() => {
        axios.get(`/book/${bookId}`).then(res => {
            setDetailData(res.data.data)
        }).catch(err => {
            setError({ error: true, message: err.response.data.message })
        })
    }, [])

    return (
        <>
            <div className={error.error ? 'displayBlock' : 'dispalyNone'}>
                <UncontrolledAlert color="danger">
                    {error.message}
                </UncontrolledAlert>
            </div>
            <Header />

            <div className='detailPage__content'>
                <div className='detailPage__nav__wrapper'>
                    <div className='detailPage__nav'>
                        <button
                            onClick={() => toggleTab(1)}
                            className={toggleState === 1 ? 'detailPage__tabs active-tabs' : 'detailPage__tabs'} >Photo</button>
                        <button
                            onClick={() => toggleTab(2)}
                            className={toggleState === 2 ? 'detailPage__tabs active-tabs' : 'detailPage__tabs'}>Book</button>
                        <button
                            onClick={() => toggleTab(3)}
                            className={toggleState === 3 ? 'detailPage__tabs active-tabs' : 'detailPage__tabs'} >Owner</button>
                    </div>
                </div>
                {detailData ?
                    <div className='detailPage__container'>
                        <div className={toggleState === 1 ? 'detailPage__container__content active-content' : 'detailPage__container__content'}>
                            <Photo data={detailData} /></div>
                        <div className={toggleState === 2 ? 'detailPage__container__content active-content' : 'detailPage__container__content'}>
                            <Book data={detailData} /> </div>
                        <div className={toggleState === 3 ? 'detailPage__container__content active-content' : 'detailPage__container__content'}>
                            <Owner data={detailData} /> </div>
                    </div> : <Spinner style={{ margin: 'auto', width: '3rem', height: '3rem' }} color="info" />}
            </div>
            <Footer />
        </>
    )
}

export default DetailPage;