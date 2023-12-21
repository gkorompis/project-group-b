import { imgClose } from "../../assets/app-icons";
import { NewStoreForm, RegisterForm } from "../../components"
import "./index.css"

const NewStorePage = ({handlers}:any) =>{
    
    return (
        <>
            <div className="new-store-page bg-blur">
                <NewStoreForm handlers = {handlers}/>
            </div>
        </>
    )
}
export default NewStorePage;