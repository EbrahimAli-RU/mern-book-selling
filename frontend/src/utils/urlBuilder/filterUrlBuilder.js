let newObj = {}
export const buildUrl = (obj, name, value) => {
    newObj = { ...obj }

    let url = ''
    if (name === 'sort') {
        value = value.toLowerCase()
        if (value === 'high to low') {
            value = '-price'
        } else if (value === 'low to high') {
            value = 'price'
        }
        newObj.sort = value
    } else {
        newObj[name] = value
    }

    for (let i in newObj) {
        if (newObj[i] !== '') {
            url = url.concat(`&${i}=${newObj[i]}`)
        }
    }
    return url
}




// export const filterUrlBuilder = (name, value, url) => {
//     value = value.toLowerCase()
//     let val = value.split(' ')[0]
//     // Copy URL to newurl
//     let newUrl = url;

//     if (val === 'select') {
//         console.log(name, value)
//         //If query String is avaiable in URL
//         let startPos = newUrl.indexOf(name), endPos = null;
//         //Finding the ending position of that query
//         for (let i = startPos + name.length; i < newUrl.length; i++) {
//             if (newUrl[i] === '&' || i === newUrl.length - 1) {
//                 endPos = i;
//                 break;
//             }
//         }
//         let firstPart = newUrl.substring(0, startPos - 1), lastpart
//         endPos === newUrl.length - 1 ? lastpart = newUrl.substring(endPos, newUrl.length - 1) : lastpart = newUrl.substring(endPos, newUrl.length)

//         newUrl = firstPart.concat(lastpart)
//     } else {
//         //Special Case
//         if (name === 'sort') {
//             value === 'high to low' ? value = '-price' : value = 'price'
//         }

//         //If the query string is not avaiable in url
//         if (newUrl.indexOf(name) === -1) {
//             newUrl = newUrl.concat(`&${name}=${value}`)
//             // setUrl(newUrl)
//         } else {
//             //If query String is avaiable in URL
//             let startPos = newUrl.indexOf(name), endPos = null;
//             //Finding the ending position of that query
//             for (let i = startPos + name.length; i < newUrl.length; i++) {
//                 if (newUrl[i] === '&' || i === newUrl.length - 1) {
//                     endPos = i;
//                     break;
//                 }
//             }
//             console.log(startPos, endPos)
//             let firstPart = newUrl.substring(0, startPos - 1), lastpart
//             // lastpart = newUrl.substring(endPos, newUrl.length - 1)
//             endPos === newUrl.length - 1 ? lastpart = newUrl.substring(endPos, newUrl.length - 1) : lastpart = newUrl.substring(endPos, newUrl.length)
//             console.log(firstPart)
//             console.log(lastpart)
//             newUrl = firstPart.concat(lastpart, `&${name}=${value}`)

//         }
//     }
//     console.log(newUrl)
//     return newUrl;

// }