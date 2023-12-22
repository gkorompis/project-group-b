import React, { useState } from 'react';
import * as Yup from 'yup';
import "./index.css"
import { useNavigate } from 'react-router-dom';

import axios from "axios"
import { BASE_URL } from '../../utils/global';
import { LoadingLogin, SnackBarMui } from '..';

const RegisterForm = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  }) as any

  interface FormErrors {
    fullname?: string;
    email?: string;
    username?: string;
    password?: string;
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
                )
  });

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
        password: ''
      });
      // post route
      try {
        setIsLoading(true);
        const response = await axios.post(`${BASE_URL}/auth/register`, formData); 
        setSeverity('success');
        setIsLoading(false);
        setOpenSnackBar(!openSnackBar);
        setErrorMessage("registration success!");
        setTimeout(()=>{
          navigate('/')
        }, 1500)
      } catch(err:any) {
        setIsLoading(false);
        setOpenSnackBar(!openSnackBar);
        const {response} = err
        const errMessage = err && err.message;
        const data = response && response.data;
        const dataErrMessage = data && data.message;
        const finalMessage = dataErrMessage || errMessage || "Server Error"
        setErrorMessage(finalMessage)
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
            Register
          </button>
        </form>
      </div>
          {
            isLoading ? <LoadingLogin/> : null
          }
          {
            openSnackBar ? <div>
                  <SnackBarMui openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} message={errorMessage} severity={severity}/>
              </div> : null
          }
      </>
    
  );
};

export default RegisterForm;
