import { imgClose } from "../../assets/app-icons";
import { DeleteAccountForm, RegisterForm } from "../../components"
import "./index.css"

const DeleteAccountPage = ({handlers}:any) =>{
    
    return (
        <>
            <div className="delete-account-page bg-blur">
                <DeleteAccountForm handlers = {handlers}/>
            </div>
        </>
    )
}
export default DeleteAccountPage;