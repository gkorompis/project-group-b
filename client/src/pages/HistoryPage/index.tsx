import "./index.css"

import { HistoryPageProps, BasketItem } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../actions";
import { productList } from "../../utils/data";
import reloadProductAction from "../../actions/reloadProductAction";
import { imgClose } from "../../assets/app-icons";
import { CustomTable, EmptyCollection, LoadingFetching } from "../../components";
import { useEffect } from "react";
import { BASE_URL, cookies } from "../../utils/global";
import {historyAction} from "../../actions";
import axios from "axios";


const HistoryPage = ({handlers, states}:HistoryPageProps) =>{

    const dispatch = useDispatch()  
    const selectorHistory = useSelector((state:any)=> state.history);
    const historyPayload = selectorHistory && selectorHistory.payload;
    const historyLoading = selectorHistory && selectorHistory.loading;
    const historyError = selectorHistory && selectorHistory.error;
    console.log(">>>selectorHistory", {historyPayload, historyLoading})

    const {setIsHistory} = handlers;
    const cookiesAll = cookies.getAll();
    const {accessToken, sessionId} = cookiesAll;

    const handlePayment = async (idTransaction:string) =>{
        try {
            const token = accessToken;
            const config = {
                headers: {Authorization: `Bearer ${token}`}
                }
            const updateBody = {
                status: "paid"
            }
            const responsePatch = await axios.patch(`${BASE_URL}/transactions/${idTransaction}`,updateBody, config);
           
            console.log(">>>update payment", responsePatch)
            const reduxState = {token, sessionId};
            dispatch(historyAction({reduxState}) as any)
        } catch(err) {
            console.log(">>>err", {err})
        }
    }
    

    useEffect(()=>{
        const token = accessToken;
        const reduxState = {token, sessionId};
        dispatch(historyAction({reduxState}) as any)
    }, [dispatch])
    return (
        <>
            <div className="history-page bg-blur" >
                <div className="table-history">
                    <div className="table-history-bar"><img className="bar-close-img" src={imgClose} onClick={()=>setIsHistory(false)}/></div>
                    <p className="table-title">History</p>
                    {
                        historyLoading ? <LoadingFetching/> :
                        historyError ? <EmptyCollection/> :
                        historyPayload[0] ? 
                        <CustomTable data={historyPayload} handlers={{handlePayment}}/> : <EmptyCollection/>
                    }
                    
                </div>  
            </div>
        </>
    )
};

export default HistoryPage;