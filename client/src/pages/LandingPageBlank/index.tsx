import React, { useEffect } from 'react'
import './index.css'

import { CustomNavbar } from '../../components'
import { LandingPageBody } from '../../containers'
import { cookies } from "../../utils/global";
import { useNavigate } from 'react-router-dom';

const LandingPage = ()=>{

    const navigate = useNavigate();

    const cookiesAll = cookies.getAll();
    const {accessToken} = cookiesAll;

    useEffect(()=>{
        if(accessToken){
            navigate("/dashboard")
        }
    }, []);
    return (
        <>
        {
        
           <div className="page-landing-page-blank">
                <div className="page-navbar">
                    <CustomNavbar/>
                </div>
                <div className="page-body">
                    <LandingPageBody/>
                </div>
            </div>
        }
            
        </>
    )
}

export default LandingPage