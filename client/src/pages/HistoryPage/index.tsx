import "./index.css"

import { HistoryPageProps, BasketItem } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../actions";
import { productList } from "../../utils/data";
import reloadProductAction from "../../actions/reloadProductAction";
import { imgClose } from "../../assets/app-icons";
import { CustomTable } from "../../components";


const HistoryPage = ({handlers, states}:HistoryPageProps) =>{
    // redux
    const {setIsHistory} = handlers;

    return (
        <>
            <div className="history-page bg-blur" >
                <div className="table-history">
                    <div className="table-history-bar"><img className="bar-close-img" src={imgClose} onClick={()=>setIsHistory(false)}/></div>
                    <p className="table-title">History</p>
                    <CustomTable/>
                </div>  
            </div>
        </>
    )
};

export default HistoryPage;