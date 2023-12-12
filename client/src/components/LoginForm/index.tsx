import React, { useState } from 'react';
import * as Yup from 'yup';
import "./index.css"
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const navigate = useNavigate()
  const handleLogin = ()=>{
    // http post
    // catch response
    // navigate
    navigate('/dashboard')
  }
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  }) as any

  interface FormErrors {
    username?: string;
    password?: string;
    }

  const [errors, setErrors] = useState<FormErrors>({}) as any;

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This field required'),
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
        username: '',
        password: ''
      });
      setErrors({}); 

      handleLogin()

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
    {name: "username", type: "text", label: "Username", onChange: handleChange},
    {name: "password", type: "password", label: "Password", onChange: handleChange}
  ]
  return (
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
  );
};

export default LoginForm;
