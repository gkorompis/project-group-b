import { Dispatch } from "redux"
import { itemBox } from "../../assets/app-icons";
import { ProductActionProps } from "../../utils/types";

import axios from 'axios';
import { BASE_URL } from '../../utils/global';

const actionTypes = {
    loading: 'HISTORY_LOADING',
    success: 'HISTORY_SUCCESS',
    error: 'HISTORY_ERROR'
}

const historyAction = ({reduxState}:ProductActionProps)=> async(dispatch:Dispatch) =>{
    try {
        console.log(">>>historyAction")
        dispatch({type: actionTypes.loading});
       
        // get route
        const {token, sessionId, sessionRole} = reduxState;
        const config = {
          headers: {Authorization: `Bearer ${token}`}
        }
        const responseGetAccount = await axios.get(`${BASE_URL}/transactions?idUser=${sessionId}`, config)
        console.log("response at historyAction", responseGetAccount)
        console.log(">>>", {responseGetAccount});
        const {data} = responseGetAccount;
        console.log(">>> historyAction response ", {data})
        const listAccounts = data && data.results || [data];
        console.log('>>>>listAccounts', listAccounts)

        const payload = listAccounts
        dispatch({type: actionTypes.success, payload})
        // console.log(">>>historyAction",actionTypes.success)
    } catch(error:any) {
        const {message} = error;
        console.log(">>> error at historyAction",{error})
        dispatch({type: actionTypes.error, message})
    }
}

export default historyAction; 