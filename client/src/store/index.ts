import {Tuple, configureStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';

import { 
    accountReducer,
    historyReducer,
    productReducer,
    reloadProductReducer,
    tokenReducer
} from '../reducers';
import storeReducer from '../reducers/storeReducer';


const store = configureStore({
    reducer: {
        products:  productReducer,
        reloadProduct: reloadProductReducer,
        tokens: tokenReducer,
        accounts: accountReducer,
        stores: storeReducer,
        history: historyReducer
    },
    middleware: ()=> new Tuple(thunk)
})

export default store;