import "./index.css"

import { cookies } from "../../utils/global";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../actions";
import { DeleteProductForm, EditProductForm, EditStoreInfoForm, EmptyCollection, InventoryCard, LoadingFetching, NewProductForm } from "../../components";
import { imgClose } from "../../assets/app-icons";

const ManageStorePage = ({handlers, states}:any) =>{ 
    // hooks
    const dispatch= useDispatch()
    const cookiesAll = cookies.getAll();
    const {accessToken} = cookiesAll;

    // states
    const [isEditStoreForm, setIsEditStoreForm] = useState(false);
    const [isNewProductForm, setIsNewProductForm ] = useState(false);
    const [isEditProductForm, setIsEditProductForm ] = useState(false);
    const [isDeleteProductForm, setIsDeleteProductForm] = useState(false);

    // reduxs
    const selectorProduct = useSelector((state:any)=> state.products);
    const selectorReloadProduct = useSelector((state:any)=> state.reloadProduct);

    // variabels
    const productLoading = selectorProduct && selectorProduct.loading
    const productError = selectorProduct && selectorProduct.error
    const productPayload = selectorProduct && selectorProduct.payload

    const {data} = states;
    const sessionOwnerStoreId = data && data.id_store;
    const {setIsEditForm} = handlers

    // hooks)
    useEffect(()=>{
        const token = accessToken
        dispatch(productAction({reduxState: {token, sessionOwnerStoreId}}) as unknown as any)
    }, [dispatch, selectorReloadProduct])
    return(
        <>
            <div className="manage-store-page">
                <div className="manage-store-bar">
                    <img className="close-img" src={imgClose} onClick={()=>setIsEditForm(false)}/>
                    <div className="menu-bar">
                        <span className="menu-bar-anchor" onClick={()=>setIsEditStoreForm(true)}>edit store</span>
                        <span className="menu-bar-anchor"onClick={()=>setIsNewProductForm(true)}>new product</span>
                        <span className="menu-bar-anchor"onClick={()=>setIsDeleteProductForm(true)}>delete product</span>
                    </div>
                </div>
                <div className="manage-store-inventory">
                    <p className="manage-store-inventory-title">Store Inventory</p>
                    {
                        productLoading ? <LoadingFetching/> : 
                        productError ? <EmptyCollection/> :
                        <div className="inventory-card-deck">{
                            productPayload.map((x:any, key:any)=>{
                            return (
                                    <>
                                        <div className="card-deck-group">
                                            <InventoryCard data={x} handlers={{setIsEditProductForm}} states={undefined}/>
                                        </div>
                                        {
                                            isEditProductForm ?
                                            <div className="bg-blur edit-store-info-form">
                                                <EditProductForm
                                                    handlers={{
                                                        setIsEditProductForm
                                                    }}
                                                    states={{
                                                        data: x,
                                                        sessionOwnerStoreId
                                                    }}
                                                />
                                            </div> : null
                                        }
                                        {
                                            isDeleteProductForm ?
                                            <div className="bg-blur edit-store-info-form">
                                                <DeleteProductForm
                                                    handlers={{
                                                        setIsDeleteProductForm
                                                    }}
                                                    states={{
                                                        sessionOwnerStoreId
                                                    }}
                                                />
                                            </div> : null
                                        }
                                         {
                                            isNewProductForm ? 
                                            <div className="bg-blur edit-store-info-form">
                                                <NewProductForm
                                                    handlers={{
                                                        setIsNewProductForm
                                                    }}
                                                    states={{
                                                        data: x,
                                                        sessionOwnerStoreId
                                                    }}
                                                />
                                            </div> : null
                                        }
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
                        states={{
                            data: data,
                            sessionOwnerStoreId
                        }}
                    />
                </div> : null
            }
           
            
            
        </>
    )
};

export default ManageStorePage;