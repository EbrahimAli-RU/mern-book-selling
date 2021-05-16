import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import bookReducer from './reducer/book'
import authReducer from './reducer/auth'
import wishlistReducer from './reducer/wishlist'
import uiReducer from './reducer/ui'


const rootReducer = combineReducers({
    book: bookReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    ui: uiReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
