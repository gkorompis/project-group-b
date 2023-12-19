import {Tuple, configureStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';

import { 
    productReducer,
    reloadProductReducer,
    tokenReducer
} from '../reducers';


const store = configureStore({
    reducer: {
        products:  productReducer,
        reloadProduct: reloadProductReducer,
        tokens: tokenReducer
    },
    middleware: ()=> new Tuple(thunk)
})

export default store;