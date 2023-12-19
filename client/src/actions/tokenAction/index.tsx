import { Dispatch } from "redux"
import { TokenActionProps } from "../../utils/types";

const actionTypes = {
    loading: 'TOKEN_LOADING',
    success: 'TOKEN_SUCCESS',
    error: 'TOKEN_ERROR'
}

const tokenAction = ({reduxState}:TokenActionProps)=> async(dispatch:Dispatch) =>{
    try {
        console.log(">>>tokenAction")
        dispatch({type: actionTypes.loading});
        // console.log(">>>tokenAction",actionTypes.loading)
        const payload = reduxState 
        dispatch({type: actionTypes.success, payload})
        // console.log(">>>tokenAction",actionTypes.success)
    } catch(error:any) {
        const {message} = error;
        console.log({error})
        dispatch({type: actionTypes.error, message})
    }
}

export default tokenAction; 