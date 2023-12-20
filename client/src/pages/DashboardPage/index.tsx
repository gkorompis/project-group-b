import React, {useState, useEffect} from 'react'
import { DashboardCardDeck } from '../../containers';
import "./index.css"
import TransactionsPage from '../TransactionsPage';

import { useDispatch } from 'react-redux';
import { tokenAction } from '../../actions';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { cookies } from '../../utils/global';
import AccountsPage from '../AccountsPage';

const DashboardPage = ()=>{
    // hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cookiesAll = cookies.getAll();
    const {accessToken} = cookiesAll;

    // states
    const [board, setBoard] = useState("");
    
    // handlers
    const handler = (e:any)=>{
        const id = e.target && e.target.id;
        console.log(">>>on clicked:",id)
        if(id){
            setBoard(id)
        }
    }

    const switchBoard = (board:string)=>{
        console.log("switching to", board)
        switch(board){
            case "transactions":
                return <TransactionsPage/>
            case "accounts":
                return <AccountsPage/>
            case "stores":
                return <h1>stores</h1>
            default:
                return (<div className="dashboard-body">
                            <div className="dashboard-title">
                                <p className="dashboard-title-text">handpos</p>
                            </div>
                            <DashboardCardDeck handler={handler}/>
                        </div>)
        }
    }

    // useEffect
    useEffect(()=>{
        if(!accessToken){
            navigate("/")
        }
    }, [])
    return (
        <>
                <div className='dashboard-page'>
                    {
                        switchBoard(board)
                    }
                </div>
        </>
    )
};

export default DashboardPage