import * as actionType from './actionTypes'

export const sideDrawerHandler = () => {
    return {
        type: actionType.HANDLESIDEDRAWER
    }
}

export const filterSideDrawerHandler = () => {
    return {
        type: actionType.FILTERSIDEDRAWER
    }
}