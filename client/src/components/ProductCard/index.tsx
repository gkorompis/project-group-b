import "./index.css"
import {useState} from 'react'
import { ProductCardProps } from "../../utils/types";
import { imgPlus, imgMinus } from "../../assets/app-icons";
const ProductCard = ({data, handler}: ProductCardProps) =>{
    const {image, title , prices} = data;
    const [quantity, setQuantity] = useState(0);

    console.log(">>>", quantity)
    const handleQuantity = () =>{
        setQuantity(prevState => prevState + 1);
        handler((prevState:any) => prevState + 1)
    }
    const handleMinusQuantity = () =>{
        setQuantity(prevState => prevState - 1);
        handler((prevState:any) => prevState - 1);
    }
    
    return(
        <>
            <div className="product-card">
                <div className="product-card-img-div">
                    <img className="product-card-img" src={image}/>
                </div>
                <div className="product-card-info">
                    <p className="product-card-text product-card-info-title">{title}</p>
                    <p className="product-card-text product-card-info-price">IDR {prices}</p>
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