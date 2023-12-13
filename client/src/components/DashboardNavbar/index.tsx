import React, {useEffect} from 'react'
import "./index.css"
import { Link, Element, scroller } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

const navbarMenus = [
    "products", "account", "stores", "transactions"
]

const CustomNavbar = () =>{
        const navigate = useNavigate();

        const handleLoginPage = () =>{
            navigate("/login")
        };
  
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
                    <a href="#" className="anchors anchor-text">
                        solutions
                    </a>
                    <a href="#" className="anchors anchor-text">
                        our stories
                    </a>
                </div>
                <div className="navbar-rightside">
                    <span className="anchors-span anchor-text" onClick={handleLoginPage}>
                        login
                    </span>
                </div>
            </nav>
        </>
    )
};

export default CustomNavbar;