import "./index.css"
import {useEffect, useState} from 'react'
import { SearchBar, ProductCard } from "../../components";
import { imgBasket } from "../../assets/app-icons";
import {AddToBasketPage} from "..";

import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../actions";


const TransactionsPage = () =>{
    // reduxs
    const dispatch = useDispatch();
    const selectorProduct = useSelector((state:any)=> state.products);
    const selectorReloadProduct = useSelector((state:any)=> state.reloadProduct);

    // states
    const [totalItem, setTotalItem] = useState(0);
    const [isBasket, setIsBasket] = useState(false);
    const [basketItems, setBasketItems ] = useState([]);

    // handlers
    const handleAddItem = ({title, prices, quantity, _id}:any) =>{
        const fetchedProduct = basketItems.filter((x:any)=>x.itemId == _id)[0] || {};
        let {addedItems, totalItemPrice, itemId, itemName} = fetchedProduct;

        const tempAddedItems = addedItems ? addedItems+1 : 1;
        const tempTotalItemPrice = tempAddedItems * prices;
        
        const tempBasketItem = {
            itemId: _id,
            itemName: title,
            addedItems: tempAddedItems,
            totalItemPrice: tempTotalItemPrice,
        }

        setBasketItems((prevState):any => {
            prevState = fetchedProduct ? prevState.filter((x:any) => x.itemId !== _id) : prevState
            return [...prevState, tempBasketItem];
        })    
    }
    const handleRemoveItem = ({title, prices, quantity, _id}:any) =>{
        const fetchedProduct = basketItems.filter((x:any)=>x.itemId == _id)[0] || {};
        let {addedItems, totalItemPrice, itemId, itemName} = fetchedProduct;

        const tempAddedItems = addedItems ? addedItems-1 : 0;
        const tempTotalItemPrice = tempAddedItems * prices;
        
        const tempBasketItem = {
            itemId: _id,
            itemName: title,
            addedItems: tempAddedItems,
            totalItemPrice: tempTotalItemPrice,
        }
        setBasketItems((prevState):any => {
            prevState = fetchedProduct ? prevState.filter((x:any) => x.itemId !== _id) : prevState
            return tempAddedItems ?  [...prevState, tempBasketItem] : [...prevState];
        })  
    };
    const handleAddToBasketPage = () =>{
        setIsBasket(prevState => !prevState);
    };

    // variables
    const states = {
        basketItems,
        totalItem
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
    
    console.log("productloading", productLoading)
    // hooks
    useEffect(()=>{
        console.log("!!!!! useEffect TransactionPage triggered")
        dispatch(productAction({}) as unknown as any)
    }, [dispatch, selectorReloadProduct])
    return(
        <>
            <div className="transactions-page">
                <div className="product-menu-bar">
                    <SearchBar/>
                </div>
                
                {/* list products */}
                <div className="product-card-deck">
                    
                    {
                        productLoading ? <h1>loading...</h1> : 
                        productError ? <h1>error...</h1> :
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
                isBasket ?   <AddToBasketPage handlers={handlersAddToBasketPage} states={states}/> : null
            }
           

        </>
    )
}

export default TransactionsPage;