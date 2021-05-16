import * as actionType from './actionTypes'

export const addToWishlist = () => {
    return {
        type: actionType.ADDTOWISHLIST
    }
}

export const removeFromWishlist = () => {
    return {
        type: actionType.REMOVEFROMWISHLIST
    }
}