import "./index.css"

import { AddToBasketPageProps, BasketItem } from "../../utils/types";
import { date } from "yup";






const AddToBasketPage = ({handler, states}:AddToBasketPageProps) =>{


    const listBasketItems:BasketItem[] = states && states.basketItems;
    const totalItem = states && states.totalItem;
    const totalItemPriceAll = listBasketItems && listBasketItems.reduce((acc:any, currentItem:any):any => {
        return acc + currentItem.totalItemPrice;
    }, 0);

    const checkoutItems = () =>{
        const checkoutDoc = {
            titleProducts: listBasketItems,
            prices: totalItemPriceAll,
            quantity: totalItem,
            orderDate: new Date(),
            links: "",
            status: "paid"
        }
        console.log(">>>>checkoutDoc -", checkoutDoc)
    }

    return (
        <>
            <div className="add-to-basket-page bg-blur" onClick={handler}>
                <div className="add-to-basket-review">
                    <p className="add-to-basket-logo-text">handpos</p>
                    <p className="add-to-basket-title-text">Order Summary</p>
                    <div className="order-card-deck">
                        {
                            listBasketItems.map((x:BasketItem, key:any)=>{
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
                        <p className="order-total-text">Rp. {totalItemPriceAll}</p>
                        <span className="order-checkout-span order-total-text" onClick={checkoutItems}>checkout</span>
                    </div>
                </div>
            </div>
        </>
    )
};

interface OrderCardProps {
    data: BasketItem
}

const OrderCard = ({data}:OrderCardProps) =>{
    const {totalItemPrice, itemId, itemName, addedItems} = data;
    return (
        <>
            <div className="order-card">
                <div className="order-card-box order-card-counts">{addedItems}x</div>
                <div className="order-card-box order-card-item">{itemName}</div>
                <div className="order-card-box order-card-prices">Rp. {totalItemPrice}</div>
            </div>
        </>
    )
};

export default AddToBasketPage;