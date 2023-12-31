import "./index.css"

import { cookies } from "../../utils/global";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../actions";
import { EditStoreInfoForm, EmptyCollection, InventoryCard, NewProductForm } from "../../components";
import { imgClose } from "../../assets/app-icons";

const ManageStorePage = ({handlers, states}:any) =>{
    // hooks
    const dispatch= useDispatch()
    const cookiesAll = cookies.getAll();
    const {accessToken} = cookiesAll;

    // states
    const [isEditStoreForm, setIsEditStoreForm] = useState(false);
    const [isNewProductForm, setIsNewProductForm ] = useState(false);

    // reduxs
    const selectorProduct = useSelector((state:any)=> state.products);
    const selectorReloadProduct = useSelector((state:any)=> state.reloadProduct);

    // variabels
    const productLoading = selectorProduct && selectorProduct.loading
    const productError = selectorProduct && selectorProduct.error
    const productPayload = selectorProduct && selectorProduct.payload

    const {data} = states;
    const {setIsEditForm} = handlers

    // hooks)
    useEffect(()=>{
        const token = accessToken
        dispatch(productAction({reduxState: {token}}) as unknown as any)
    }, [dispatch, selectorReloadProduct])
    return(
        <>
            <div className="manage-store-page">
                <div className="manage-store-bar">
                    <img className="close-img" src={imgClose} onClick={()=>setIsEditForm(false)}/>
                    <div className="menu-bar">
                        <span className="menu-bar-anchor" onClick={()=>setIsEditStoreForm(true)}>edit store</span>
                        <span className="menu-bar-anchor"onClick={()=>setIsNewProductForm(true)}>new product</span>
                    </div>
                </div>
                <div className="manage-store-inventory">
                    <p className="manage-store-inventory-title">Store Inventory</p>
                    {
                        productLoading ? <h1>loading...</h1> : 
                        productError ? <EmptyCollection/> :
                        <div className="inventory-card-deck">{
                            productPayload.map((x:any, key:any)=>{
                            return (
                                    <>
                                        <div className="card-deck-group">
                                            <InventoryCard data={x} handlers={undefined} states={undefined}/>
                                        </div>
                                    </>
                                )
                            })
                        }
                        </div>
                    }
                </div>
            </div>
            {
                isEditStoreForm ? 
                <div className="bg-blur edit-store-info-form">
                    <EditStoreInfoForm 
                        handlers={{
                            setIsEditStoreForm
                        }}
                        states={states}/>
                </div> : null
            }
            {
                isNewProductForm ? 
                <div className="bg-blur edit-store-info-form">
                    <NewProductForm
                        handlers={{
                            setIsNewProductForm
                        }}
                    />
                </div> : null
            }
        </>
    )
};

export default ManageStorePage;