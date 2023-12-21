import "./index.css"
import {useState} from 'react'
import { ProductCardProps } from "../../utils/types";
import { imgPlus, imgMinus, itemBox } from "../../assets/app-icons";

const ProductCard = ({data, handlers, states}: ProductCardProps) =>{
    const {image, title , price, _id, id} = data;
    const uniqueId = _id || id;
    const [quantity, setQuantity] = useState(0);
    const {handleAddItem, handleRemoveItem, setTotalItem} = handlers;
    
    const handleQuantity = (event:any) =>{
        setQuantity(prevState => prevState + 1);
        setTotalItem((prevState:any) => prevState + 1);
        handleAddItem({title,price: +price, uniqueId})
    }
    const handleMinusQuantity = (event:any) =>{
        setQuantity(prevState => prevState - 1);
        setTotalItem((prevState:any) => prevState - 1);
        handleRemoveItem({title,price: +price, uniqueId});
    }
    
    return(
        <>
            <div className="product-card">
                <div className="product-card-img-div">
                    <img className="product-card-img" src={itemBox}/>
                </div>
                <div className="product-card-info">
                    <p className="product-card-text product-card-info-title">{title}</p>
                    <p className="product-card-text product-card-info-price">IDR {price}</p>
                    <div className="product-card-add-div">
                    
                            
                            {
                                quantity ?
                                <>
                                    <img className="card-add-logo" onClick={handleMinusQuantity} src={imgMinus}/>
                                    <span onClick={handleQuantity}  className="card-add-quantity">{quantity}</span>
                                </>  : 
                                <img className="card-add-logo" onClick={handleQuantity} src={imgPlus}/>
                            }
                    </div>
                </div>
            </div>
        </>
    )
};

export default ProductCard