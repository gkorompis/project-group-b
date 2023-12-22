import React, { useState } from 'react';
import * as Yup from 'yup';
import "./index.css"
import { useNavigate } from 'react-router-dom';

import axios from "axios"
import { BASE_URL, cookies } from '../../utils/global';

import { useDispatch } from 'react-redux';
import { accountAction, storeAction, tokenAction } from '../../actions';
import { DeleteStoreFrom } from '../../utils/types';
import { imgClose } from '../../assets/app-icons';


const DeleteStoreForm = ({handlers, states}:DeleteStoreFrom) => {
  // cookies
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookiesAll = cookies.getAll();
  const {accessToken, sessionId, sessionRole} = cookiesAll;

  const {setIsDeleteForm} = handlers;

  const handleCloseForm = ()=>{
    setIsDeleteForm(false)
  }
  
  const handleDeleteStore = async (formData:any)=>{
    try {
      const token = accessToken;
      const config = {
          headers: {Authorization: `Bearer ${token}`}
        }

      const {id} = formData
      const responsePatch = await axios.delete(`${BASE_URL}/stores/${id}`, config);
      console.log('>>> deleteForm response patch', {responsePatch})
      
      dispatch(storeAction({reduxState: {token, sessionRole, sessionId}}) as any)
      // dispatch({type: "RELOAD_PRODUCTS_LOADING"})
      setIsDeleteForm(false);
    } catch(err){
      console.log(err)
    }
  }
  const [formData, setFormData] = useState({
    id: "",
  }) as any

  interface FormErrors {
      id?: string;
    }

  const [errors, setErrors] = useState<FormErrors>({}) as any;

  const validationSchema = Yup.object().shape({
    id: Yup.string().required('This field is required'),
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
        id: '',
      });

      setErrors({}); 

      handleDeleteStore(formData)

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
    {name: "id", type: "text", label: "id", onChange: handleChange},
  ]

  return (
    <div className="login-form">
      <div className='form-cancel-button'>
        <img className='form-cancel-logo' src={imgClose} onClick={handleCloseForm}/>
      </div>
      <p className="form-title" onClick={()=> null}>Enter id to delete</p>
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
          Delete
        </button>

      </form>
    </div>
  );
};

export default DeleteStoreForm;
