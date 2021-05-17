import { axiosWithAuth } from '../../utils/axios/axiosWithAuth'
import { checkValue, filterHandler, inUseEffect } from '../../utils/obj'
import Photo from '../../assets/img/book1.jpg'
export const sellBook = {
    bookName: '',
    authorName: '',
    edition: '',
    publication: '',
    numberOfPage: '',
    missingPage: 'no',
    missingPageYes: '',
    region: '',
    city: '',
    area: '',
    name: '',
    mobile: '',
    language: '',
    price: '',
    coverphoto: '',
    coverphoto1: Photo,
    photos: [],
    photos1: [Photo],
    owner: ''
}

export const toggleTab = (toggleState, tab, setToggleState, bookData, url, method, props, setIsError, setLoading) => {

    let currrentTab = toggleState
    if (tab === 'back')
        setToggleState(currrentTab - 1)
    else {
        if (toggleState >= 3) {
            submitBookHandler(bookData, url, method, props, setIsError, setLoading)
        } else {
            setToggleState(currrentTab + 1)
        }
    }
}


export const submitBookHandler = (bookData, url, submitMethode, props, setIsError, setLoading) => {
    let copyBookData = { ...bookData }
    let fd = new FormData(), check = 0;
    if (copyBookData.missingPage === 'yes') copyBookData.missingPage = copyBookData.missingPageYes
    if (copyBookData.coverphoto1 === '') delete copyBookData['coverphoto']
    if (copyBookData.photos1.length === 0) {
        delete copyBookData['photos']
        check = 1
    }
    for (let key in copyBookData) {
        if (key !== 'photos' || key !== 'missingPageYes')
            fd.append(`${key}`, copyBookData[key])
        else if (key === 'photos1' || key === 'coverphoto1') {
            console.log('Do Nothing')
        }
    }
    if (check === 0) {
        fd.append('photos', copyBookData.photos[0]);
        fd.append('photos', copyBookData.photos[1]);
        fd.append('photos', copyBookData.photos[2]);
    }
    setLoading(true)
    axiosWithAuth()({
        method: submitMethode,
        url: url,
        data: fd
    }).then(res => {
        console.log(res)
        props.history.push('/own-book')
        setLoading(false)
    }).catch(err => {
        console.log(err.response)
        setLoading(false)
        setIsError({ error: true, message: err.response.data.message.split(',')[0] })
        setTimeout(() => { setIsError({ error: false, message: '' }) }, 1000)
    })
}

export const inputHandler = (e, bookData, setBookData, filterData, setFilterData) => {
    let { name, value } = e.target
    let newBookData = { ...bookData }
    if (name === 'coverphoto') {
        newBookData[name] = e.target.files[0]
        newBookData.coverphoto1 = URL.createObjectURL(e.target.files[0])
    } else if (name === 'photos') {
        let arr = [], arr1 = []
        for (let i = 0; i < e.target.files.length; i++) {
            arr.push(e.target.files[i])
            arr1.push(URL.createObjectURL(e.target.files[i]))
        }
        newBookData[name] = arr
        newBookData.photos1 = arr1
    } else {
        let rObj = checkValue(name, value, newBookData)
        newBookData = { ...rObj.obj }; value = rObj.val

        if (name === 'region' || name === 'city') {
            filterHandler(name, value, filterData, setFilterData)
        }
    }
    setBookData(newBookData)
}