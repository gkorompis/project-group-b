import React, { useState } from 'react';
import * as Yup from 'yup';
import "./index.css"
import { useNavigate } from 'react-router-dom';

import axios from "axios"
import { BASE_URL, cookies } from '../../utils/global';

import { useDispatch } from 'react-redux';
import { accountAction, tokenAction } from '../../actions';
import { EditAccountFrom } from '../../utils/types';
import { imgClose } from '../../assets/app-icons';


const EditAccountForm = ({handlers, states}:EditAccountFrom) => {
  // cookies
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookiesAll = cookies.getAll();
  const {accessToken, sessionId} = cookiesAll;

  const {isEditForm, data} = states;
  const {setIsEditStoreForm} = handlers;

  const id = data && data.id;

  const handleCloseForm = ()=>{
    setIsEditStoreForm(false)
  }
  
  const handleEditAccount = async (formData:any)=>{
    try {
      setIsEditStoreForm(!isEditForm)
      const token = accessToken;
      const config = {
          headers: {Authorization: `Bearer ${token}`}
        }
      const responsePatch = await axios.patch(`${BASE_URL}/users/${id}`,formData, config);
      console.log('>>> editForm response patch', {responsePatch})
      
      dispatch(accountAction({reduxState: {token}}) as any)
      dispatch({type: "RELOAD_PRODUCTS_LOADING"})
    } catch(err){
      console.log(err)
    }
  }
  const [formData, setFormData] = useState({
    fullname: data && data.fullname,
    username: data && data.username,
    email: data && data.email
  }) as any

  interface FormErrors {
    fullname?: string;
    email?: string;
    username?: string;
    }

  const [errors, setErrors] = useState<FormErrors>({}) as any;

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('This field is required'),
    username: Yup.string().required('This field is required'),
    email: Yup.string().email('Invalid email').required('This field is required')
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
        email: '',
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
    {name: "fullname", type: "text", label: "Full Name", onChange: handleChange},
    {name: "username", type: "text", label: "Username", onChange: handleChange},
    {name: "email", type: "email", label: "Email", onChange: handleChange},
  ]

  return (
    <div className="login-form">
      <div className='form-cancel-button'>
        <img className='form-cancel-logo' src={imgClose} onClick={handleCloseForm}/>
      </div>
      <p className="form-title" onClick={()=> null}>Edit Account Info</p>
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
