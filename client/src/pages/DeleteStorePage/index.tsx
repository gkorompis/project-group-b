import { imgClose } from "../../assets/app-icons";
import { DeleteStoreForm, RegisterForm } from "../../components"
import "./index.css"

const DeleteStorePage = ({handlers}:any) =>{
    
    return (
        <>
            <div className="delete-account-page bg-blur">
                <DeleteStoreForm handlers = {handlers}/>
            </div>
        </>
    )
}
export default DeleteStorePage;