import "./index.css"
import {useEffect, useState} from 'react'
import { SearchBar, ProductCard, EmptyCollection, SlidingBar, LoadingFetching } from "../../components";
import { imgBasket} from "../../assets/app-icons";
import {AddToBasketPage, HistoryPage} from "..";

import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../actions";
import { useNavigate } from "react-router-dom";
import { cookies } from "../../utils/global";
import { TransactionMenuItems } from "../../utils/types";


const TransactionsPage = () =>{
    // hooks
    const navigate = useNavigate();
    const cookiesAll = cookies.getAll();
    const {accessToken, sessionOwnerStoreId, sessionId} = cookiesAll;

    // reduxs
    const dispatch = useDispatch();
    const selectorProduct = useSelector((state:any)=> state.products);
    const selectorReloadProduct = useSelector((state:any)=> state.reloadProduct);

    // states
    const [totalItem, setTotalItem] = useState(0);
    const [isBasket, setIsBasket] = useState(false);
    const [isHistory, setIsHistory] = useState(false);
    const [basketItems, setBasketItems ] = useState([]);

    // handlers
 
    const handleAddItem = ({title, price, quantity, uniqueId}:any) =>{
    
        const fetchedProduct = basketItems.filter((x:any)=>x.idProduct == uniqueId)[0] || {};
        let {qty, subtotal, idProduct} = fetchedProduct;

        const tempAddedItems = qty ? qty+1 : 1;
        const tempTotalItemPrice = tempAddedItems * +price;
        
        const tempBasketItem = {
            idProduct: uniqueId,
            title: title,
            qty: tempAddedItems,
            subtotal: tempTotalItemPrice,
        }

        setBasketItems((prevState):any => {
            prevState = fetchedProduct ? prevState.filter((x:any) => x.idProduct !== uniqueId) : prevState
            return [...prevState, tempBasketItem];
        })    
    }
    const handleRemoveItem = ({title, price, quantity, uniqueId}:any) =>{
       
        const fetchedProduct = basketItems.filter((x:any)=>x.idProduct == uniqueId)[0] || {};
        let {qty, subtotal} = fetchedProduct;

        const tempAddedItems = qty ? qty-1 : 0;
        const tempTotalItemPrice = tempAddedItems * +price;
        
        const tempBasketItem = {
            idProduct: uniqueId,
            title: title,
            qty: tempAddedItems,
            subtotal: tempTotalItemPrice,
        }
        setBasketItems((prevState):any => {
            prevState = fetchedProduct ? prevState.filter((x:any) => x.idProduct !== uniqueId) : prevState
            return tempAddedItems ?  [...prevState, tempBasketItem] : [...prevState];
        })  
    };
    const handleAddToBasketPage = () =>{
        setIsBasket(prevState => !prevState);
    };

    // variables
    const states = {
        basketItems,
        totalItem,
        sessionId,
        sessionOwnerStoreId
    }
    const handlers = {
        handleAddItem,
        handleRemoveItem,
        setTotalItem
    }
    const handlersAddToBasketPage = {
        setIsBasket,
        setTotalItem,
        setBasketItems
    }

    const productLoading = selectorProduct && selectorProduct.loading
    const productError = selectorProduct && selectorProduct.error
    const productPayload = selectorProduct && selectorProduct.payload
    
    const transactionsMenuItems = [
        {field: "history", handler: ()=>setIsHistory(true) , image: "" },
        {field: "baskets", handler: ()=>setIsBasket(true), image: "" }
    ] as TransactionMenuItems[]

    // hooks)
    useEffect(()=>{
        console.log("!!!!! useEffect TransactionPage triggered");
        const token = accessToken;
        dispatch(productAction({reduxState: {token, sessionOwnerStoreId}}) as unknown as any)
        // dispatch({type: "PRODUCTS_LOADING"})
    }, [dispatch, selectorReloadProduct])
    return(
        <>
            <div className="transactions-page">
                <SlidingBar items={transactionsMenuItems} page={"transactions"}/>
                <div className="product-menu-bar">
                    <SearchBar/>
                </div>
                {/* list products */}
                    {
                        productLoading ? <LoadingFetching/> : 
                        productError ? <EmptyCollection/> :
                        <div className="product-card-deck">{
                            productPayload.map((x:any, key:any)=>{
                            return (
                                    <>
                                        <div className="card-deck-group">
                                            <ProductCard data={x} handlers={handlers} states={states}/>
                                        </div>
                                    </>
                                )
                            })
                        }
                        </div>
                    }
                
                <div className="floating-div" onClick={handleAddToBasketPage}>
                    {
                        totalItem ? 
                        <div className="basket-count">
                            <p className="basket-count-text">{totalItem}</p>
                        </div> : null
                    }
                    
                    <div className="floating-basket-div">
                        <img className="floating-basket-logo" src={imgBasket}/>
                    </div>
                   
                </div>  
            </div>
            {
                isBasket ?   <AddToBasketPage 
                    handlers={handlersAddToBasketPage} 
                    states={states}/> 
                : null
            }
            {
                isHistory ? <HistoryPage 
                    handlers={{
                        setIsHistory
                    }} 
                    states={undefined}/> 
                : null
            }
           

        </>
    )
}

export default TransactionsPage;