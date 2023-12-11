import React from 'react'
import './index.css'

import { CustomNavbar } from '../../components'
import { LandingPageBody } from '../../containers'

const LandingPage = ()=>{
    return (
        <>
            <div className="page-landing-page-blank">
                <div className="page-navbar">
                    <CustomNavbar/>
                </div>
                <div className="page-body">
                    <LandingPageBody/>
                </div>
            </div>
        </>
    )
}

export default LandingPage