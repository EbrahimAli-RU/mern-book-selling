const initialState = {
    sideDrawer: false,
    filterSideDrawer: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'HANDLESIDEDRAWER':
            return {
                ...state,
                sideDrawer: !state.sideDrawer
            }
        case 'FILTERSIDEDRAWER':
            return {
                ...state,
                filterSideDrawer: !state.filterSideDrawer
            }
        default:
            return state
    }
}

export default reducer