import React, { useState } from 'react'
import { sellBook, toggleTab, inputHandler } from './util'
import Error from '../../component/error/Error'
import UI from './UI'
import { Spinner } from 'reactstrap'
import { withRouter } from 'react-router'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
const data = {
    region: [],
    city: [],
    area: []
}
const errorData = {
    error: false,
    message: ''
}

const SellBook = (props) => {
    const [bookData, setBookData] = useState(sellBook);
    const [filterData, setFilterData] = useState(data)
    const [toggleState, setToggleState] = useState(1)
    const [isError, setIsError] = useState(errorData)
    const [isDisabled, setIsDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const validate = (e) => {
        let { name, value } = e.target
        let flag = 1
        const copyBookData = { ...bookData }
        if ((name === 'region' || name === 'city' || name === 'area') && value.split(' ')[0] === 'Select') {
            value = ''
        }
        copyBookData[name] = value
        for (let key in copyBookData) {
            if (copyBookData[key] === '' && key !== 'owner' && key !== 'missingPageYes') {
                flag = 0
                break;
            }
            if (copyBookData.missingPage === 'yes' && copyBookData.missingPageYes === '')
                flag = 0
        }
        flag === 0 ? setIsDisabled(true) : setIsDisabled(false)
    }
    const handleInput = (e) => {
        inputHandler(e, bookData, setBookData, filterData, setFilterData)
        validate(e)
    }

    const toggle = (tab) => {
        console.log(bookData)
        toggleTab(toggleState, tab, setToggleState, bookData, '/book', 'post', props, setIsError, setLoading)
    }

    return (
        <>
            <Header />
            {loading ? <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: '200', left: '0', top: '0', backgroundColor: 'rgba(0,0,0,.2' }}>
                <div className='spinner__container'><Spinner color='danger' className='spinner' /></div>
            </div> : null
            }
            <Error show={isError.error} message={isError.message} />
            <UI
                toggleState={toggleState}
                bookData={bookData}
                filterData={filterData}
                sell={true}
                inputHandler={handleInput}
                toggleTab={(tab) => toggle(tab)}
                isDisabled={isDisabled} />
            <Footer />
        </>
    )
}

export default withRouter(SellBook)