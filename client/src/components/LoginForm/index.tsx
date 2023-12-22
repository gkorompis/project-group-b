import React, { useState } from 'react';
import * as Yup from 'yup';
import "./index.css"
import { useNavigate } from 'react-router-dom';

import axios from "axios"
import { BASE_URL } from '../../utils/global';

import { useDispatch } from 'react-redux';
import { tokenAction } from '../../actions';
import LoadingLogin from '../LoadingLogin';
import { SnackBarMui } from '..';


const LoginForm = () => {



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const handleLogin = async (formData:any)=>{
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/login`, formData);
      console.log(">>> auth/login response:", response);

      const data = response && response.data;
      const tokens = data && data.tokens;
      const reduxState = {tokens};
      dispatch(tokenAction({reduxState}) as any)

      navigate('/dashboard')
    } catch(err:any){
      setIsLoading(false);
      setOpenSnackBar(!openSnackBar);
      const {response} = err
      const errMessage = err && err.message;
      const data = response && response.data;
      const dataErrMessage = data && data.message;
      const finalMessage = dataErrMessage || errMessage || "Server Error"
      setErrorMessage(finalMessage)
    }
  }
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  }) as any

  interface FormErrors {
    email?: string;
    password?: string;
    }

  const [errors, setErrors] = useState<FormErrors>({}) as any;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('This field is required'),
    password: Yup.string().required('This field required')
                .min(8, 'Password must be at least 8 characters')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)/,
                    'Password must contain at least one letter and one number'
                )
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

      handleLogin(formData)

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
    {name: "email", type: "email", label: "Email", onChange: handleChange},
    {name: "password", type: "password", label: "Password", onChange: handleChange}
  ]
  return (
    <>
    <div className="login-form">
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
          Login
        </button>
      </form>
    </div>
        {
          isLoading ? <LoadingLogin/> : null
        }
        {
          openSnackBar ? <div>
                <SnackBarMui openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} message={errorMessage}/>
            </div> : null
        }
    </>
    
  );
};

export default LoginForm;
