import React, { useState } from 'react';
import * as Yup from 'yup';
import "./index.css"
import { useNavigate } from 'react-router-dom';

import axios from "axios"
import { BASE_URL, cookies } from '../../utils/global';

import { useDispatch } from 'react-redux';
import { accountAction, productAction, tokenAction } from '../../actions';
import { EditAccountFrom } from '../../utils/types';
import { imgClose } from '../../assets/app-icons';


const EditAccountForm = ({handlers, states}:EditAccountFrom) => {
  // cookies
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookiesAll = cookies.getAll();
  const {accessToken, sessionId} = cookiesAll;

  const { data, sessionOwnerStoreId} = states;
  const {setIsEditProductForm} = handlers;

  const id = data && data.id;

  const handleCloseForm = ()=>{
    setIsEditProductForm(false)
  }
  
  const handleEditAccount = async (formData:any)=>{
    try {
      setIsEditProductForm(false)
      const token = accessToken;
      const config = {
          headers: {Authorization: `Bearer ${token}`}
        }
      const responsePatch = await axios.patch(`${BASE_URL}/products/${id}`,formData, config);
      console.log('>>> editForm response patch', {responsePatch})
      
      dispatch(productAction({reduxState: {token, sessionOwnerStoreId}}) as any)
    } catch(err){
      console.log(err)
    }
  }
  const [formData, setFormData] = useState({
    title: data && data.title,
    price: data && data.price,
    stock: data && data.stock,
    description: data && data.description
  }) as any

  interface FormErrors {
    idStore?: string;
    price?: string;
    title?: string;
    }

  const [errors, setErrors] = useState<FormErrors>({}) as any;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('This field is required'),
    price: Yup.number().required('This field is required'),
    stock: Yup.number().required('This field is required'),
    description: Yup.string().required('This field is required')

  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        console.log('Form submitted:', formData);
        setFormData({
        price: '',
        password: ''
      });

      setErrors({}); 

      handleEditAccount(formData)

      })
      .catch((validationErrors) => {
        const formattedErrors = {} as any;
        validationErrors.inner.forEach((error:any) => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
      });
  };
  
  // const handleFormTitle = () =>{
  //   navigate("/")
  // }
  const fields = [
    {name: "title", type: "text", label: "product name", onChange: handleChange},
    {name: "price", type: "text", label: "unit price", onChange: handleChange},
    {name: "stock", type: "text", label: "stock", onChange: handleChange},
    {name: "description", type: "text", label: "description", onChange: handleChange},
  ]

  return (
    <div className="login-form">
      <div className='form-cancel-button'>
        <img className='form-cancel-logo' src={imgClose} onClick={handleCloseForm}/>
      </div>
      <p className="form-title" onClick={()=> null}>Edit Product Info</p>
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
          Edit
        </button>

      </form>
    </div>
  );
};

export default EditAccountForm;
