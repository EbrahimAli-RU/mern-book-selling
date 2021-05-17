import React, { useEffect, useState } from 'react'
import Input from '../../component/dropodownInput/Input'
import { connect } from 'react-redux'
import * as action from '../../redux/actions/book'
import { buildUrl } from '../../utils/urlBuilder/filterUrlBuilder'
import { filter, data, checkValue, filterHandler, inUseEffect } from '../../utils/obj'

const SideBar = (props) => {
    const [filterBy, setFilterBy] = useState(filter);
    const [filterData, setFilterData] = useState(data)

    const inputHandler = (e) => {
        let { name, value } = e.target
        let newFilterBy = { ...filterBy }
        //CALL check method
        let rObj = checkValue(name, value, newFilterBy)
        newFilterBy = { ...rObj.obj }; value = rObj.val
        if (name !== 'sort' && name !== 'area') {
            filterHandler(name, value, filterData, setFilterData)
        }
        const newurl = buildUrl(newFilterBy, name, value)
        props.setUrlHandler(newurl)
        props.filterByHandler(props.searchBy, newurl)
        setFilterBy(newFilterBy)
    }

    useEffect(() => { inUseEffect(filterData, setFilterData) }, [])

    const sortOption = ['High to Low', 'Low to High']
    return (
        <div className='sidebar__area'>
            <div className='sidebar__area-filter'>
                <p className='sidebar__area__title'>FILTER</p>
                <Input option={filterData.region}
                    mark='Region'
                    value={filterBy.region}
                    handler={inputHandler}
                    isDisable={false}
                    name='region' />
                <Input option={filterData.city}
                    mark='City'
                    value={filterBy.city}
                    handler={inputHandler}
                    isDisable={filterBy.region === ''}
                    name='city' />
                <Input option={filterData.area}
                    mark='Area'
                    value={filterBy.area}
                    isDisable={filterBy.region === '' || filterBy.city === ''}
                    handler={inputHandler}
                    name='area' />
            </div>
            <div className='sidebar__area-sort'>
                <p className='sidebar__area__title'>SORT</p>
                <Input option={sortOption}
                    handler={inputHandler}
                    name='sort' />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        searchBy: state.book.searchData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        filterByHandler: (searchBy, url) => dispatch(action.fetchBook(searchBy, url)),
        setUrlHandler: (url) => dispatch(action.setUrl(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);