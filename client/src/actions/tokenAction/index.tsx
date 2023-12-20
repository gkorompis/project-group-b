import { Dispatch } from "redux"
import { TokenActionProps } from "../../utils/types";
import axios from "axios";
import { cookies } from "../../utils/global";

const actionTypes = {
    loading: 'TOKEN_LOADING',
    success: 'TOKEN_SUCCESS',
    error: 'TOKEN_ERROR'
}

const tokenAction = ({reduxState}:TokenActionProps)=> async(dispatch:Dispatch) =>{
    try {
        console.log(">>>tokenAction")
        dispatch({type: actionTypes.loading});

        const {tokens} = reduxState;

        const {access, refresh} = tokens || {};

        const accessToken = access && access.token;
        const refreshToken = refresh && refresh.token;
        
        cookies.set('accessToken', accessToken, {path: '/'})
        cookies.set('refreshToken', refreshToken, {path: '/'})

        axios.defaults.headers.common = {'Authorization': `bearer ${accessToken}`}

        const payload = {tokens}
        dispatch({type: actionTypes.success, payload})
        // console.log(">>>tokenAction",actionTypes.success)
    } catch(error:any) {
        const {message} = error;
        console.log({error})
        dispatch({type: actionTypes.error, message})
    }
}

export default tokenAction; 