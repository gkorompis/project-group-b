import "./index.css"

import { AddToBasketPageProps, BasketItem } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../actions";
import { productList } from "../../utils/data";
import reloadProductAction from "../../actions/reloadProductAction";
import { imgClose } from "../../assets/app-icons";


const AddToBasketPage = ({handlers, states}:AddToBasketPageProps) =>{
    // reduxs
    const dispatch = useDispatch();
    const {setBasketItems, setIsBasket, setTotalItem} = handlers

    const idUser = states && states.sessionId;
    const idStore = states && states.sessionOwnerStoreId;
    const listBasketItems:BasketItem[] = states && states.basketItems;
    const totalItem = states && states.totalItem;
    const subtotalAll = listBasketItems && listBasketItems.reduce((acc:any, currentItem:any):any => {
        return acc + currentItem.subtotal;
    }, 0);

    const checkoutItems = async (totalItem:any) =>{
        if (!totalItem) {
            return dispatch(productAction({}) as unknown as any);
            // return setIsBasket(false);
        }
        // const checkoutDoc = {
        //     titleProducts: listBasketItems,
        //     prices: subtotalAll,
        //     quantity: totalItem,
        //     orderDate: new Date(),
        //     links: "",
        //     status: "paid"
        // }

        const checkoutDoc = {
            idUser: idUser,
            idStore: idStore,
            products: [
                listBasketItems
            ],
            transactionDate: new Date()
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
                    <div className="add-to-basket-bar"><img className="basket-close-img" src={imgClose} onClick={()=> setIsBasket(false)}/></div>
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
                        <p className="order-total-text">IDR {subtotalAll}</p>
                        <span className="order-checkout-span order-total-text" onClick={totalItem ? ()=> checkoutItems(totalItem) : ()=> null}>checkout</span>
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
    const {subtotal, idProduct, title, qty} = data;
    return (
        <>
            <div className="order-card">
                <div className="order-card-box order-card-counts">{qty}x</div>
                <div className="order-card-box order-card-item">{title}</div>
                <div className="order-card-box order-card-prices"> {subtotal}</div>
            </div>
        </>
    )
};

export default AddToBasketPage;