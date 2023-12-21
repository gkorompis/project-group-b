import { imgClose } from "../../assets/app-icons";
import { NewAccountForm, RegisterForm } from "../../components"
import "./index.css"

const NewAccountPage = ({handlers}:any) =>{
    
    return (
        <>
            <div className="new-account-page bg-blur">
                <NewAccountForm handlers = {handlers}/>
            </div>
        </>
    )
}
export default NewAccountPage;