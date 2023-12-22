import { LinearProgress } from '@mui/material';
import './index.css'
import React from 'react'

const LoadingFetching = () =>{

    return(
        <>
            <div className="loading-div">
                <div className="loading-fetching">
                    <LinearProgress color="inherit" />
                </div>
            </div>
        </>
    )
};

export default LoadingFetching