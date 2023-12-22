import { AccountCard, EmptyCollection, RegisterForm, SearchBar, SlidingBar } from "../../components";
import "./index.css"

import { useNavigate } from "react-router-dom";
import { cookies } from "../../utils/global";
import { useDispatch, useSelector } from "react-redux";
import { accountAction } from "../../actions";
import { useEffect, useState } from "react";
import { TransactionMenuItems } from "../../utils/types";
import {NewAccountPage, DeleteAccountPage} from "..";


const AccountsPage = () =>{
    // hooks
    const navigate = useNavigate();
    const cookiesAll = cookies.getAll();
    const {accessToken, sessionId, sessionRole} = cookiesAll;

    // states
    const [isNewAccountForm , setIsNewAccountForm ] = useState(false);
    const [isDeleteForm, setIsDeleteForm] = useState(false);

     // reduxs
    const dispatch = useDispatch();
    const selectorAccount = useSelector((state:any)=> state.accounts);
    const selectorReload = useSelector((state:any)=> state.reloadProduct)
    
    const accountLoading = selectorAccount && selectorAccount.loading;
    const accountError = selectorAccount && selectorAccount.error;
    const accountPayload = selectorAccount && selectorAccount.payload;
    console.log(">>>accountPayload", accountPayload);

    const accountsMenuItems = [
        {field: "new account", handler: ()=>setIsNewAccountForm(true) , image: "" },
        {field: "delete account", handler: ()=>setIsDeleteForm(true), image: "" }
    ] as TransactionMenuItems[]
    
    //useEffect
    useEffect(()=>{
        if(!accessToken){
            navigate("/")
        } else {
            const token = accessToken
            dispatch(accountAction({reduxState: {token, sessionId, sessionRole}}) as any)
        } 
    }, [dispatch, selectorReload])

    return (
        <>
            <div className="accounts-page">
                <SlidingBar items={accountsMenuItems} page={"accounts"}/>
                <div className="accounts-menu-bar">
                    <SearchBar placeholderMessage={"Type name to search..."}/>
                </div>
                 {
                        accountLoading ? <h1>loading...</h1> : 
                        accountError ? <EmptyCollection/> :
                        <div className="accounts-card-deck">{
                            accountPayload.map((x:any, key:any)=>{
                            // const fullname = x && x.fullname || "-"
                            return (
                                    <>
                                        <div className="card-deck-group">
                                            <AccountCard data={x}/>
                                        </div>
                                    </>
                                )
                            })
                        }
                        </div>
                    }
                {/* <div className="accounts-card-deck">
                    
                </div> */}
            </div>
            {
                isNewAccountForm ? <NewAccountPage 
                    handlers = {{
                        setIsNewAccountForm
                    }}/>
                : null
            }
            {
                isDeleteForm ?  <DeleteAccountPage
                    handlers = {{
                        setIsDeleteForm
                    }}
                />
                : null
            }
        </>
    )
}

export default AccountsPage;

