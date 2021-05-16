import * as actionType from './actionTypes'

export const sideDrawerHandler = () => {
    console.log('hgfhj')
    return {
        type: actionType.HANDLESIDEDRAWER
    }
}

export const filterSideDrawerHandler = () => {
    return {
        type: actionType.FILTERSIDEDRAWER
    }
}