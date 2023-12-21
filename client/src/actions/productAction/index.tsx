import { Dispatch } from "redux"
import { itemBox } from "../../assets/app-icons";
import { ProductActionProps } from "../../utils/types";

import axios from 'axios';
import { BASE_URL } from '../../utils/global';

const actionTypes = {
    loading: 'PRODUCTS_LOADING',
    success: 'PRODUCTS_SUCCESS',
    error: 'PRODUCTS_ERROR'
}

const dummyProducts= [
  {
    _id: "mongo1",
    id_store: "001",
    title: "Blue Shirt",
    prices: 250000,
    quantity: 50,
    description: "Comfortable blue shirt for casual wear.",
    image: itemBox
  },
  {
    _id: "mongo2",
    id_store: "002",
    title: "Black Dress",
    prices: 600000,
    quantity: 30,
    description: "Elegant black dress suitable for parties.",
    image: itemBox
  },
  {
    _id: "mongo3",
    id_store: "003",
    title: "New Jeans",
    prices: 950000,
    quantity: 30,
    description: "Elegant black dress suitable for parties.",
    image: itemBox
  },
  {
    _id: "mongo4",
    id_store: "004",
    title: "Jacket Vanilla",
    prices: 780000,
    quantity: 30,
    description: "Elegant black dress suitable for parties.",
    image: itemBox
  },
  {
    _id: "mongo5",
    id_store: "005",
    title: "Shoes",
    prices: 380000,
    quantity: 30,
    description: "Elegant black dress suitable for parties.",
    image: itemBox
  },
  {
    _id: "mongo6",
    id_store: "006",
    title: "Handphones",
    prices: 4800000,
    quantity: 30,
    description: "Elegant black dress suitable for parties.",
    image: itemBox
  }
]


const productAction = ({reduxState}:ProductActionProps)=> async(dispatch:Dispatch) =>{
    try {
        console.log(">>>productAction")
        dispatch({type: actionTypes.loading});
       
        // get route
        const {token} = reduxState;
        const config = {
          headers: {Authorization: `Bearer ${token}`}
        }
        const bodyParameters = {
          key: "value"
        };

        const responseGetProduct = await axios.get(`${BASE_URL}/products`, config)
        console.log(">>>", {responseGetProduct})
        const {data} = responseGetProduct;
        const listProducts = data && data.results;

        const payload = listProducts || dummyProducts;
        dispatch({type: actionTypes.success, payload})
        // console.log(">>>productAction",actionTypes.success)
    } catch(error:any) {
        const {message} = error;
        console.log({error})
        dispatch({type: actionTypes.error, message})
    }
}

export default productAction; 