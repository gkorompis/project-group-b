import {Reducer} from 'redux';

const actionTypes = {
    loading: 'HISTORY_LOADING',
    success: 'HISTORY_SUCCESS',
    error: 'HISTORY_ERROR'
}
const stateDefault = {
    loading: true,
    payload: []
}
const historyReducer:Reducer = (state=stateDefault, action) =>{
    console.log(">>>historyReducer")
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
export default historyReducer;