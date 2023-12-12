import React, {useEffect} from 'react'
import "./index.css"
import { Link, Element, scroller } from 'react-scroll';

const CustomNavbar = () =>{
  
        const scrollToPage = (page:any) =>{
            const doc = document as any
            window.scrollTo({
                top: doc.getElementById(page).offsetTop - 70,
                behavior: 'smooth'
            })
        }

        const handleScrollToPage = (page:any) =>{
            scrollToPage(page)
        }
        useEffect(()=>{
            scrollToPage("custom-navbar")
        }, [])
    return (
        <>
            <nav id="custom-navbar" className="custom-navbar">
                <div className="navbar-leftside">
                    
                    <a href="#" className="anchors anchor-logo">
                        handpos
                    </a>
                    <Link
                        activeClass="active"
                        to="business-solutions"
                        spy={true}
                        smooth={true}
                        offset={-50}
                        duration={500}
                        onClick={()=> handleScrollToPage('business-solutions')}
                    >
                        <a href="#" className="anchors anchor-text">
                            solutions
                        </a>
                    </Link>
                    <Link
                        activeClass="active"
                        to="our-stories"
                        spy={true}
                        smooth={true}
                        offset={-50}
                        duration={500}
                        onClick={()=> handleScrollToPage('our-stories')}
                    >
                        <a href="#" className="anchors anchor-text">
                            our stories
                        </a>
                    </Link>
                    
                </div>
                <div className="navbar-rightside">
                    {/* <a href="#" className="anchors anchor-text">
                       login
                    </a> */}
                    <span className="anchors-span anchor-text">
                        login
                    </span>
                </div>
            </nav>
        </>
    )
};

export default CustomNavbar;