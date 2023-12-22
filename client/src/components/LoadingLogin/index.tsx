import { LinearProgress } from '@mui/material';
import './index.css'
import React from 'react'

const LoadingLogin = () =>{

    return(
        <>
                <div className="bg-blur">
                    <LinearProgress color="inherit" />
                </div>
        </>
    )
};

export default LoadingLogin