import { useNavigate } from "react-router-dom";
import { EmptyCollection, SearchBar, StoreCard } from "../../components";
import "./index.css";
import { cookies } from "../../utils/global";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { storeAction } from "../../actions";

const StoresPage = ()=>{
    // hooks
    const navigate = useNavigate();
    const cookiesAll = cookies.getAll();
    const {accessToken} = cookiesAll;

    // reduxs
    const dispatch = useDispatch();
    const selectorStore = useSelector((state:any)=> state.stores);
    const selectorReload = useSelector((state:any)=> state.reloadProduct)
    
    const storeLoading = selectorStore && selectorStore.loading;
    const storeError = selectorStore && selectorStore.error;
    const storePayload = selectorStore && selectorStore.payload;
    
    console.log(">>>storePayload", storePayload);

    //useEffect
    useEffect(()=>{
        if(!accessToken){
            navigate("/")
        } else {
            const token = accessToken
            dispatch(storeAction({reduxState: {token}}) as any)
        } 
    }, [dispatch, selectorReload])
    return (
        <>
            <div className="stores-page">
                <div className="stores-menu-bar">
                    <SearchBar placeholderMessage={"Type store to search..."}/>
                </div>
                <div>
                    {
                        storeLoading ? <h1>loading...</h1> : 
                        storeError ? <EmptyCollection/> :
                        <div className="stores-card-deck">{
                            storePayload.map((x:any, key:any)=>{
                            // const fullname = x && x.fullname || "-"
                            return (
                                    <>
                                        <div className="card-deck-group">
                                            <StoreCard data={x}/>
                                        </div>
                                    </>
                                )
                            })
                        }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default StoresPage;