import "./index.css"
import {useState} from 'react'
import { StoreCardProps } from "../../utils/types";
import { imgStore } from "../../assets/app-icons";
import { ManageStorePage } from "../../pages";
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
                    <img className="store-card-img" src={imgStore} onClick ={handleEditForm}/>
                </div>
                <div className="store-card-info" >
                    <p className="store-card-text store-card-info-title">{store_name || "-"}</p>
                    <p className="store-card-text store-card-info-text">{store_category || "-"}</p>
                    <p className="store-card-text store-card-info-text">{id|| "-"}</p>
                
                </div>
            </div>
            {
                isEditForm ? 
                <div className="bg-blur manage-store-form">
                    <ManageStorePage
                        handlers={{
                            setIsEditForm
                        }}
                        states ={{
                            data
                        }}
                    />
                </div> : null
            }
            
        </>
    )
};

export default StoreCard