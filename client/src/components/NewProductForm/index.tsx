import React, { useState } from 'react';
import * as Yup from 'yup';
import "./index.css"
import { useNavigate } from 'react-router-dom';

import axios from "axios"
import { BASE_URL, cookies } from '../../utils/global';
import { imgClose } from '../../assets/app-icons';
import { useDispatch } from 'react-redux';
import { accountAction, productAction } from '../../actions';

const NewStoreForm = ({handlers, states}:any) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {data}= states;
  const idStore = data && data.id_store;
  const [formData, setFormData] = useState({
    idStore: idStore,
    title: "",
    price: "",
    stock: "",
    description: "",
    image: "image.com"
  }) as any

  interface FormErrors {
    idStore?: string,
    title?: string,
    price?: string,
    stock?: string,
    description?: string,
    image?: string
    }

  const [errors, setErrors] = useState<FormErrors>({}) as any;
  console.log(">>>errors", errors)

  const validationSchema = Yup.object().shape({
    idStore: Yup.string().required('This field is required'),
    title: Yup.string().required('This field is required'),
    price: Yup.string().required('This field is required'),
    stock: Yup.string().required('This field is required'),
    description: Yup.string().required('This field is required'),
  });
  const {setIsNewProductForm } = handlers
  const {sessionOwnerStoreId} = states;
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e:any) => {
    console.log("handlesubmit")
    e.preventDefault();
    validationSchema
      .validate(formData, { abortEarly: false })
      .then( async () => {
        console.log('Form submitted:', formData);
        setFormData({
        idStore: "",
        title: "",
        price: "",
        stock: "",
        image: "",
        description: ""
      });
      // post route
      try {
        console.log(">>>handlesubmit")
        const cookiesAll = cookies.getAll();
        const {accessToken} = cookiesAll;
        const token = accessToken
        const config = {
          headers: {Authorization: `Bearer ${token}`}
        }
        const response = await axios.post(`${BASE_URL}/products`, formData, config); 
        console.log(">>response create product", response)
        dispatch(productAction({reduxState: {token, sessionOwnerStoreId}}) as any)
        setIsNewProductForm(false)
      } catch(err) {
        console.log(err)
      }
      setErrors({}); 
      })
      .catch((validationErrors) => {
        const formattedErrors = {} as any;
        validationErrors.inner.forEach((error:any) => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
      });
  };
  
  const handleFormTitle = () =>{
    navigate("/")
  }
  const fields = [
    {name: "idStore", type: "text", label: "id store", onChange: handleChange},
    {name: "title", type: "text", label: "product name", onChange: handleChange},
    {name: "price", type: "text", label: "unit price", onChange: handleChange},
    {name: "stock", type: "text", label: "stock", onChange: handleChange},
    {name: "description", type: "text", label: "description", onChange: handleChange},
  ]
  return (
    <div className="login-form">
      <div className="form-bar"><img className="basket-close-img" src={imgClose} onClick={()=> setIsNewProductForm(false)}/></div>
      <p className="form-title" onClick={handleFormTitle}>handpos</p>
      <form className="form-body" onSubmit={handleSubmit}>
        {
            fields.map((field:any, key:any)=>{
                const fieldName = field["name"];
                return (
                    <div key={key} className="form-group">
                        <label className="form-label" htmlFor={field["name"]}>{field && field['label']}</label>
                        <input
                            type={field["type"]}
                            className="form-control"
                            id={field["name"]}
                            name={field["name"]}
                            value={formData[field["name"]]}
                            onChange={handleChange}
                        />
                        {errors[fieldName]&& <div className="text-danger">{errors[fieldName]}</div>}
                    </div>
                )
            })
        }
        <button type="submit" className="form-button">
          New Product
        </button>
      </form>
    </div>
  );
};

export default NewStoreForm;
