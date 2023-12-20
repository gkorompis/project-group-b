import "./index.css"
import { LoginForm } from "../../components";

import { useNavigate } from "react-router-dom";
import { cookies } from "../../utils/global";
import { useEffect } from "react";

const LoginPage = () =>{
    // hooks
    const navigate = useNavigate();
    const cookiesAll = cookies.getAll();
    const {accessToken} = cookiesAll;
    useEffect(()=>{
        if(accessToken){
           navigate("/dashboard") 
        }
    }, [])
    return (
        <>
            <div className="login-page-container">
                <LoginForm/>
            </div>
        </>
    )
};

export default LoginPage;