import "./index.css"
import {useState} from 'react'
import { AccountCardProps } from "../../utils/types";
import { imgUser } from "../../assets/app-icons";
import EditAccountForm from "../EditAccountForm";

const AccountCard = ({data}: AccountCardProps) =>{
    const {role, email, fullname, username, id} = data;
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
            <div className="account-card">
                <div className="account-card-img-div">
                    <img className="account-card-img" src={imgUser}/>
                </div>
                <div className="account-card-info" onClick ={handleEditForm}>
                    <p className="account-card-text account-card-info-title">{fullname || "-"}</p>
                    <p className="account-card-text account-card-info-text">{role || "-"}</p>
                    <p className="account-card-text account-card-info-text">{email || "-"}</p>
                    <p className="account-card-text account-card-info-text">{username || "-"}</p>
                
                </div>
            </div>
            {
                isEditForm ? 
                <div className="bg-blur account-card-edit-form">
                    <EditAccountForm handlers={handlers} states={states}/>
                </div> : null
            }
            
        </>
    )
};

export default AccountCard