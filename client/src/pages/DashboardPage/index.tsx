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
import StoresPage from '../StoresPage';
import { imgLogout, imgReturn } from '../../assets/app-icons';

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
                return <StoresPage/>
            default:
                return (<div className="dashboard-body">
                            <div className="dashboard-title">
                                <p className="dashboard-title-text">handpos</p>
                            </div>
                            <DashboardCardDeck handler={handler}/>
                        </div>)
        }
    }

    const handleReturn = () =>{
        setBoard("dashboard")
    }

    const handleLogout = () =>{
        cookies.remove("refreshToken", {path: "/"})
        cookies.remove("accessToken", {path: "/"})
        navigate("/")
    }

    // useEffect
    useEffect(()=>{
        if(!accessToken){
            navigate("/")
        }
    }, [])
    return (
        <>
                <div className="dashboard-navbar" >
                    <img className="navbar-img navbar-logout-img" src={imgReturn} onClick={handleReturn} />
                    <img className="navbar-img navbar-logout-img" src={imgLogout} onClick={handleLogout} />
                </div>
                <div className='dashboard-page'>
                    {
                        switchBoard(board)
                    }
                </div>
        </>
    )
};

export default DashboardPage