import React from 'react'
import "./index.css"

import { imgEmptyBox } from '../../assets/app-icons'


const EmptyCollection = () =>{

    return (
        <>
            <div className="empty-collection-div">
                <img className="empty-collection-img" src={imgEmptyBox}/>
                <p className="empty-collection-text">empty collection</p>
            </div>
        </>
    )
}

export default EmptyCollection;