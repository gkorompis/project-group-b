import "./index.css"
import {useState} from 'react'
import { productList } from "./data";
import { SearchBar, ProductCard } from "../../components";
import { imgBasket } from "../../assets/app-icons";
import AddToBasketPage from "../AddToBasketPage";

const TransactionsPage = () =>{

    const [totalItem, setTotalItem] = useState(0);
    const [isBasket, setIsBasket] = useState(false);


    const handleAddToBasketPage = () =>{
        setIsBasket(prevState => !prevState);
    };
    console.log(">>>totalItem", totalItem)

    return(
        <>
            <div className="transactions-page">
                <div className="product-menu-bar">
                    <SearchBar/>
                </div>
                
                {/* list products */}
                <div className="product-card-deck">
                    {
                        productList.map((x:any, key:any)=>{
                            return (
                                <>
                                    <div className="card-deck-group">
                                        <ProductCard data={x} handler={setTotalItem}/>
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
                isBasket ?   <AddToBasketPage handler={handleAddToBasketPage}/> : null
            }
           

        </>
    )
}

export default TransactionsPage;