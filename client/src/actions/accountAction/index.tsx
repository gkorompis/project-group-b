import { Dispatch } from "redux"
import { itemBox } from "../../assets/app-icons";
import { ProductActionProps } from "../../utils/types";

import axios from 'axios';
import { BASE_URL } from '../../utils/global';

const actionTypes = {
    loading: 'ACCOUNTS_LOADING',
    success: 'ACCOUNTS_SUCCESS',
    error: 'ACCOUNTS_ERROR'
}

const accountAction = ({reduxState}:ProductActionProps)=> async(dispatch:Dispatch) =>{
    try {
        console.log(">>>accountAction")
        dispatch({type: actionTypes.loading});
       
        // get route
        const {token, sessionId, sessionRole} = reduxState;
        const config = {
          headers: {Authorization: `Bearer ${token}`}
        }

        const params = !(sessionRole == 'admin' || sessionRole == 'Admin' ) ? `${sessionId}` : ``;
        console.log(">>>params", params)
        const responseGetAccount = await axios.get(`${BASE_URL}/users/${params}`, config)
        console.log(">>>", {responseGetAccount})
        const {data} = responseGetAccount;
        console.log(">>> accountAction response ", {data})

        const listAccounts = !(sessionRole == 'admin' || sessionRole == 'Admin' ) ? [data] : data && data.results;
        console.log('>>>>listAccounts', listAccounts)

        const payload = listAccounts
        dispatch({type: actionTypes.success, payload})
        // console.log(">>>accountAction",actionTypes.success)
    } catch(error:any) {
        const {message} = error;
        console.log({error})
        dispatch({type: actionTypes.error, message})
    }
}

export default accountAction; 