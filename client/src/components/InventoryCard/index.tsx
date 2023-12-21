import "./index.css"
import {useState} from 'react'
import { ProductCardProps } from "../../utils/types";
import { imgPlus, imgMinus, itemBox } from "../../assets/app-icons";

const ProductCard = ({data, handlers, states}: ProductCardProps) =>{
    const {image, title , price, _id, id} = data;
    const uniqueId = _id || id;
    const [quantity, setQuantity] = useState(0);
    
    return(
        <>
            <div className="product-card">
                <div className="product-card-img-div">
                    <img className="product-card-img" src={itemBox}/>
                </div>
                <div className="product-card-info">
                    <p className="product-card-text product-card-info-title">{title}</p>
                    <p className="product-card-text product-card-info-price">IDR {price}</p>
                </div>
            </div>
        </>
    )
};


export default ProductCard