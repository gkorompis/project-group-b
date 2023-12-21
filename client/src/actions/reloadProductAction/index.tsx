import { Dispatch } from "redux"

const actionTypes = {
    loading: 'RELOAD_PRODUCTS_LOADING',
    success: 'RELOAD_PRODUCTS_SUCCESS',
    error: 'RELOAD_PRODUCTS_ERROR'
}

const reloadProductAction = (reduxState:any) => async (dispatch:Dispatch) =>{
    try { 
        //loading
        console.log(">>>>> reloadProductAction triggered")
        dispatch({
            type: actionTypes.loading,
        });

        //action

        //success
        dispatch({
            type: actionTypes.success,
            payload: reduxState,
        })
    } catch(error){
        //error
        dispatch({
            type: actionTypes.error,
            message: error,
        })
    }
}

export default reloadProductAction;