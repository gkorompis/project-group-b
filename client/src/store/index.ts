import {Tuple, configureStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';

import { 
    productReducer,
    reloadProductReducer
} from '../reducers';


const store = configureStore({
    reducer: {
        products:  productReducer,
        reloadProduct: reloadProductReducer
    },
    middleware: ()=> new Tuple(thunk)
})

export default store;