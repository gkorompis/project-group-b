import {Reducer} from 'redux';

const actionTypes = {
    loading: 'RELOAD_PRODUCTS_LOADING',
    success: 'RELOAD_PRODUCTS_SUCCESS',
    error: 'RELOAD_PRODUCTS_ERROR'
}
const stateDefault = {
    loading: false,
    payload: []
}
const reloadProductReducer:Reducer = (state=stateDefault, action) =>{
    switch (action.type){
        case actionTypes.loading:
            return {loading: true}
        case actionTypes.success:
            return {loading: false, payload: action.payload}
        case actionTypes.error:
            return {error: true, message: action.message}
        default:
            return state
    }
};
export default reloadProductReducer;