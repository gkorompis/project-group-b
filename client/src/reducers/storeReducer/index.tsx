import {Reducer} from 'redux';

const actionTypes = {
    loading: 'STORES_LOADING',
    success: 'STORES_SUCCESS',
    error: 'STORES_ERROR'
}

const stateDefault = {
    loading: false,
    payload: []
}
const storeReducer:Reducer = (state=stateDefault, action) =>{
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
export default storeReducer;