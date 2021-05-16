const initialState = {
    countWishlist: 0
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADDTOWISHLIST':
            return {
                ...state,
                countWishlist: state.countWishlist + 1
            }
        case 'REMOVEFROMWISHLIST':
            return {
                ...state,
                countWishlist: state.countWishlist - 1
            }
        default:
            return state
    }
}

export default reducer