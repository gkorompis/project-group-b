import "./index.css"

import { AddToBasketPageProps, BasketItem } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../actions";
import { productList } from "../../utils/data";
import reloadProductAction from "../../actions/reloadProductAction";


const AddToBasketPage = ({handlers, states}:AddToBasketPageProps) =>{
    // reduxs
    const dispatch = useDispatch();
    const {setBasketItems, setIsBasket, setTotalItem} = handlers

    const listBasketItems:BasketItem[] = states && states.basketItems;
    const totalItem = states && states.totalItem;
    const totalItemPriceAll = listBasketItems && listBasketItems.reduce((acc:any, currentItem:any):any => {
        return acc + currentItem.totalItemPrice;
    }, 0);

    const checkoutItems = async (totalItem:any) =>{
        if (!totalItem) {
            return dispatch(productAction({}) as unknown as any);
            // return setIsBasket(false);
        }
        const checkoutDoc = {
            titleProducts: listBasketItems,
            prices: totalItemPriceAll,
            quantity: totalItem,
            orderDate: new Date(),
            links: "",
            status: "paid"
        }
        setTotalItem(0);
        setBasketItems([]);
        setIsBasket(false);
        console.log(">>>>checkoutDoc -", checkoutDoc)
        const reduxState = productList
        // await dispatch(productAction({reduxState}) as unknown as any);
        dispatch({type: "PRODUCTS_LOADING"})
        dispatch(reloadProductAction(reduxState) as any)
        console.log(">>>addToBasketPage", "dispatch")
    }

    return (
        <>
            <div className="add-to-basket-page bg-blur">
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
                        <p className="order-total-text">IDR {totalItemPriceAll}</p>
                        <span className="order-checkout-span order-total-text" onClick={()=> checkoutItems(totalItem)}>checkout</span>
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
                <div className="order-card-box order-card-prices"> {totalItemPrice}</div>
            </div>
        </>
    )
};

export default AddToBasketPage;