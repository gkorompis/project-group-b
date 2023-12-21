import React, { useState } from 'react';
import * as Yup from 'yup';
import "./index.css"
import { useNavigate } from 'react-router-dom';

import axios from "axios"
import { BASE_URL, cookies } from '../../utils/global';
import { imgClose } from '../../assets/app-icons';
import { useDispatch } from 'react-redux';
import { accountAction } from '../../actions';

const NewStoreForm = ({handlers}:any) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    store_name: "",
    store_category: ""
  }) as any

  interface FormErrors {
    store_name?: string;
    store_category?: string;
    }

  const [errors, setErrors] = useState<FormErrors>({}) as any;

  const validationSchema = Yup.object().shape({
    store_name: Yup.string().required('This field is required'),
    store_category: Yup.string().required('This field is required')
  });
  const {setIsNewProductForm } = handlers
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    validationSchema
      .validate(formData, { abortEarly: false })
      .then( async () => {
        console.log('Form submitted:', formData);
        setFormData({
        store_name: '',
        store_category: ''
      });
      // post route
      try {
        const cookiesAll = cookies.getAll();
        const {accessToken} = cookiesAll;
        const token = accessToken
        const config = {
          headers: {Authorization: `Bearer ${token}`}
        }
        const response = await axios.post(`${BASE_URL}/users`, formData, config); 
        console.log(">>response", response)
        dispatch(accountAction({reduxState: {token}}) as any)
        dispatch({type: "RELOAD_PRODUCTS_LOADING"})
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
    {name: "store_name", type: "text", label: "Store Name", onChange: handleChange},
    {name: "store_category", type: "text", label: "Store Category", onChange: handleChange}
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
          New Store
        </button>
      </form>
    </div>
  );
};

export default NewStoreForm;
