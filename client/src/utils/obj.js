import axios from './axios/axios'
export const data = {
    region: [],
    city: [],
    area: []
}

export const filter = {
    region: '',
    city: '',
    area: '',
    sort: ''
}
export const checkValue = (name, value, newFilterBy) => {

    let valueCopy = value

    //Call BuildHandler
    if (name !== 'sort' && valueCopy.split(' ')[0] === 'Select') {
        value = ''
        if (valueCopy.split(' ')[1] === 'Region') {
            newFilterBy[name] = value
            newFilterBy.area = ''
            newFilterBy.city = ''
        } else if (valueCopy.split(' ')[1] === 'City') {
            newFilterBy[name] = ''
            newFilterBy.area = ''
        } else if (valueCopy.split(' ')[1] === 'Area') {
            newFilterBy[name] = ''
        }
    } else if (name === 'sort') {
        if (valueCopy === 'Select') {
            value = ''
            newFilterBy[name] = value
        }
        value = value.toLowerCase()
        if (value === 'high to low') {
            value = '-price'
            newFilterBy[name] = value
        } else if (value === 'low to high') {
            value = 'price'
            newFilterBy[name] = value
        }
    } else {
        if (name === 'city') {
            newFilterBy.area = ''
        } else if (name === 'region') {
            newFilterBy.city = ''
            newFilterBy.area = ''
        }
        newFilterBy[name] = value
    }
    let rObj = {
        obj: newFilterBy,
        val: value
    }

    return rObj;

}

export const filterHandler = (name, value, filterData, setFilterData) => {
    let selectFil = ''
    if (name === 'region') selectFil = 'city'
    else if (name === 'city') selectFil = 'area'
    axios.get(`/filter?area=${value}&filterType=${name}`).then(res => {
        const newFilterData = { ...filterData }
        if (value === 'Select' || res.data.data.length === 0) {
            if (name === 'region') {
                newFilterData[selectFil] = res.data.data
                newFilterData.area = res.data.data
            } else if (name === 'city') {
                newFilterData[selectFil] = res.data.data
            }

        } else {
            if (name === 'region') {
                newFilterData[selectFil] = res.data.data[0].allArea
                newFilterData.area = []
            } else if (name === 'city') {
                newFilterData[selectFil] = res.data.data[0].allArea
            }
        }
        setFilterData(newFilterData)
    }).catch(err => {
        console.log(err.response)
    })
}

export const inUseEffect = (filterData, setFilterData) => {
    axios.get(`/filter?area=region&filterType=region`).then(res => {
        let newFilterData = { ...filterData }
        newFilterData['region'] = res.data.data[0].allArea
        setFilterData(newFilterData)
    }).catch(err => {
        console.log(err.response)
    })
}