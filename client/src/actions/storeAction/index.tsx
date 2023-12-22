import { Dispatch } from "redux"
import { itemBox } from "../../assets/app-icons";
import { ProductActionProps } from "../../utils/types";

import axios from 'axios';
import { BASE_URL } from '../../utils/global';

const actionTypes = {
    loading: 'STORES_LOADING',
    success: 'STORES_SUCCESS',
    error: 'STORES_ERROR'
}

const storeAction = ({reduxState}:ProductActionProps)=> async(dispatch:Dispatch) =>{
    try {
        console.log(">>>storeAction")
        dispatch({type: actionTypes.loading});
       
        // get route
        const {token, sessionId, sessionRole} = reduxState;
        const config = {
          headers: {Authorization: `Bearer ${token}`}
        }

        const query = !(sessionRole == 'admin' || sessionRole == 'Admin' ) ? `id_user=${sessionId}` : ``;
        console.log(">>>queryStore", query)

        const responseGetProduct = await axios.get(`${BASE_URL}/stores?${query}`, config)
        console.log(">>>", {responseGetProduct})
        const {data} = responseGetProduct;
        console.log(">>> storeAction response ", {data})
        const listStores = data && data.results;

        const payload = listStores
        dispatch({type: actionTypes.success, payload})
        // console.log(">>>storeAction",actionTypes.success)
    } catch(error:any) {
        const {message} = error;
        console.log({error})
        dispatch({type: actionTypes.error, message})
    }
}

export default storeAction; 