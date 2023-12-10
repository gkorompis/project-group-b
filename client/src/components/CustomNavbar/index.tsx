import React from 'react'
import "./index.css"


const CustomNavbar = () =>{
    return (
        <>
            <nav className="custom-navbar">
                <div className="navbar-leftside">
                    <a href="#" className="anchors anchor-logo">
                        lorem
                    </a>
                    <a href="#" className="anchors anchor-text">
                        solutions
                    </a>
                    <a href="#" className="anchors anchor-text">
                        our stories
                    </a>
                </div>
                <div className="navbar-rightside">
                    <a href="#" className="anchors anchor-text">
                       login
                    </a>
                </div>
            </nav>
        </>
    )
};

export default CustomNavbar;