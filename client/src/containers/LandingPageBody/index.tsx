import React , {useEffect} from 'react'
import "./index.css"

import landingPageLogo from '../../assets/app-icons/mobile-store.png'
import calculator from '../../assets/app-icons/calculator.png'
import calculator2 from '../../assets/app-icons/calculator-2.png'
import growth from '../../assets/app-icons/growth.png'
import money2 from '../../assets/app-icons/salary.png'
import people from '../../assets/app-icons/people-network.png'

import {AppForm} from '../../components'
import { useNavigate } from 'react-router-dom'


const LandingPageBody = () =>{
    
    const navigate = useNavigate();
    const handleSpanRegister =()=>{
        navigate('/register')
    };
    return (
        <>
            <div className="landing-page-body">
                <div className="grid-row grid-row-1">
                    <div className="body-leftside">
                    <p className="landing-page-tagline-text">
                        Solusi tepat untuk bisnis lokal
                    </p>
                    <span className="landing-page-span" onClick={handleSpanRegister} >
                        mulai disini
                    </span>
                    </div>
                    <div className="body-rightside">
                        {/* <AppForm/> */}
                        <img className="landing-page-img" src={landingPageLogo} />
                    </div>
                </div>
                <div id="business-solutions" className="grid-row grid-row-2">
                    <div className="grid-row-head">
                        <p className="grid-row-head-text">Business Solutions</p>
                    </div>
                    <div className="row-2-body row-2-body-1">
                        
                        <div className="page-card page-card-1">
                            <img className="card-img" src={calculator2}></img>
                            <p className="card-title-text">Payment Solution</p>
                            <p className="card-body-text">Enhance business operations with an advanced POS solution, simplifying transactions and improving customer service.</p>
                        </div>
                    </div>
                    <div className="row-2-body row-2-body-2">
                        
                        <div className="page-card page-card-2">
                            <img className="card-img" src={growth}></img>
                            <p className="card-title-text">Reporting Solution</p>
                            <p className="card-body-text">Enhance business operations with an advanced POS solution, simplifying transactions and improving customer service.</p>
                        </div>
                    </div>
                    <div className="row-2-body row-2-body-3">
                        <div className="page-card page-card-3">
                            <img className="card-img" src={money2}></img>
                            <p className="card-title-text">Marketing Solution</p>
                            <p className="card-body-text">Enhance business operations with an advanced POS solution, simplifying transactions and improving customer service.</p>
                        </div>
                    </div>
                </div>
                <div id="our-stories"  className="grid-row grid-row-3">
                    <div className="row-3-body row-3-body-1">
                        <img className="row-3-body-img" src={people}></img>
                    </div>
                    <div className="row-3-body row-3-body-2">
                        <p className="grid-row-3-head-text">Our Stories</p>
                        <p className='grid-row-3-body-text'>Our app empowered local businesses by streamlining operations, boosting visibility, and facilitating seamless customer engagement. With its intuitive interface and tailored features, it catalyzed growth and amplified their presence in the community, driving increased foot traffic and fostering lasting connections.</p>
                    </div>
                    
                   
                </div>
                <div className="page-footer">
                    <footer className="site-footer">
                        <div className="footer-content">
                            <p className="footer-text">© 2023 Handpos. All Rights Reserved.</p>
                            <ul>
                            <li><a className="footer-text" href="#">Privacy Policy</a></li>
                            <li><a className="footer-text" href="#">Terms of Service</a></li>
                            <li><a className="footer-text" href="#">Contact Us</a></li>
                            </ul>
                        </div>
                    </footer>
                </div>
                
            </div>
        </>
    )
}
export default LandingPageBody