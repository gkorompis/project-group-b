import "./index.css"

import { AddToBasketPageProps } from "../../utils/types";

const listOrder = [
    {
        title: "Blue Shirt", 
        totalQuantity: 5,
        totalPrices: 12500
    },
    {
        title: "Jacket", 
        totalQuantity: 5,
        totalPrices: 750000
    },
    {
        title: "Sunglass", 
        totalQuantity: 5,
        totalPrices: 103250
    },
    {
        title: "Blue Shirt", 
        totalQuantity: 5,
        totalPrices: 12500
    },
    {
        title: "Jacket", 
        totalQuantity: 5,
        totalPrices: 750000
    },
    {
        title: "Sunglass", 
        totalQuantity: 5,
        totalPrices: 103250
    },
    {
        title: "Blue Shirt", 
        totalQuantity: 5,
        totalPrices: 12500
    },
    {
        title: "Jacket", 
        totalQuantity: 5,
        totalPrices: 750000
    },
    {
        title: "Sunglass", 
        totalQuantity: 5,
        totalPrices: 103250
    },
    {
        title: "Blue Shirt", 
        totalQuantity: 5,
        totalPrices: 12500
    },
    {
        title: "Jacket", 
        totalQuantity: 5,
        totalPrices: 750000
    },
    {
        title: "Sunglass", 
        totalQuantity: 5,
        totalPrices: 103250
    }
]

const AddToBasketPage = ({handler}:AddToBasketPageProps) =>{


    return (
        <>
            <div className="add-to-basket-page bg-blur" onClick={handler}>
                <div className="add-to-basket-review">
                    <p className="add-to-basket-logo-text">handpos</p>
                    <p className="add-to-basket-title-text">Order Summary</p>
                    <div className="order-card-deck">
                        {
                            listOrder.map((x:any, key:any)=>{
                                return (
                                    <>
                                        <OrderCard data={x}/>
                                    </>
                                )
                            })
                        }
                       
                    </div>
                     <div className="order-total">
                        <p className="order-total-text">Total</p>
                        <p className="order-total-text">Rp. 1553500</p>
                        <span className="order-checkout-span order-total-text">checkout</span>
                    </div>
                </div>
            </div>
        </>
    )
};

interface OrderCardProps {
    data: any
}

const OrderCard = ({data}:OrderCardProps) =>{
    const {title, totalQuantity, totalPrices} = data;
    return (
        <>
            <div className="order-card">
                <div className="order-card-box order-card-counts">{totalQuantity}x</div>
                <div className="order-card-box order-card-item">{title}</div>
                <div className="order-card-box order-card-prices">Rp. {totalPrices}</div>
            </div>
        </>
    )
};

export default AddToBasketPage;