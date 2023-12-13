import React, {useState, useEffect} from 'react'
import { DashboardCardDeck } from '../../containers';
import "./index.css"
import TransactionsPage from '../TransactionsPage';

const DashboardPage = ()=>{
    const [board, setBoard] = useState("");

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
                return <h1>accounts</h1>
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