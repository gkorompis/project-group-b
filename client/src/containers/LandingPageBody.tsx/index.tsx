import React from 'react'
import "./index.css"

import {AppForm} from '../../components'

const LandingPageBody = () =>{
    return (
        <>
            <div className="landing-page-body">
                <div className="body-leftside">
                    <p className="landing-page-tagline-text">
                        Solusi tepat untuk bisnis lokal
                    </p>
                </div>
                <div className="body-rightside">
                    <AppForm/>
                </div>
                
            </div>
        </>
    )
}
export default LandingPageBody