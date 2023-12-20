import "./index.css"
import {useState} from 'react'
import { StoreCardProps } from "../../utils/types";
import { imgStore } from "../../assets/app-icons";
// import EditStoreForm from "../EditStoreForm";

const StoreCard = ({data}: StoreCardProps) =>{
    const {store_name, store_category, id} = data;
    const [isEditForm, setIsEditForm] = useState(false)


    const handlers = {
        setIsEditForm
    }
    const states = {
        isEditForm,
        data
    }

    const handleEditForm = () =>{
        setIsEditForm(!isEditForm)
    }
    return(
        <>
            <div className="store-card">
                <div className="store-card-img-div">
                    <img className="store-card-img" src={imgStore}/>
                </div>
                <div className="store-card-info" onClick ={handleEditForm}>
                    <p className="store-card-text store-card-info-title">{store_name || "-"}</p>
                    <p className="store-card-text store-card-info-text">{store_category || "-"}</p>
                    <p className="store-card-text store-card-info-text">{id|| "-"}</p>
                
                </div>
            </div>
            {
                isEditForm ? 
                <div className="bg-blur store-card-edit-form" onClick={()=>setIsEditForm(!isEditForm)}>
                    {/* <EditStoreForm handlers={handlers} states={states}/> */}
                </div> : null
            }
            
        </>
    )
};

export default StoreCard