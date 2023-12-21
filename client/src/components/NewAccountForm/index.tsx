import React, { useState } from 'react';
import * as Yup from 'yup';
import "./index.css"
import { useNavigate } from 'react-router-dom';

import axios from "axios"
import { BASE_URL, cookies } from '../../utils/global';
import { imgClose } from '../../assets/app-icons';
import { useDispatch } from 'react-redux';
import { accountAction } from '../../actions';

const NewAccountForm = ({handlers}:any) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    role: ''
  }) as any

  interface FormErrors {
    fullname?: string;
    email?: string;
    username?: string;
    password?: string;
    role?: string;
    }

  const [errors, setErrors] = useState<FormErrors>({}) as any;

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('This field is required'),
    username: Yup.string().required('This field is required'),
    email: Yup.string().email('Invalid email').required('This field is required'),
    password: Yup.string().required('This field required')
                .min(8, 'Password must be at least 8 characters')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)/,
                    'Password must contain at least one letter and one number'
                ),
    role: Yup.string().required('This field is required'),
  });
  const {setIsNewAccountForm } = handlers
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
        fullname: '',
        username: '',
        email: '',
        password: '',
        role: ''
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
        setIsNewAccountForm(false)
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
    {name: "fullname", type: "text", label: "Full Name", onChange: handleChange},
    {name: "username", type: "text", label: "Username", onChange: handleChange},
    {name: "email", type: "email", label: "Email", onChange: handleChange},
    {name: "password", type: "password", label: "Password", onChange: handleChange},
    {name: "role", type: "text", label: "Role", onChange: handleChange},
  ]
  return (
    <div className="login-form">
      <div className="form-bar"><img className="basket-close-img" src={imgClose} onClick={()=> setIsNewAccountForm(false)}/></div>
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
          New Account
        </button>
      </form>
    </div>
  );
};

export default NewAccountForm;
