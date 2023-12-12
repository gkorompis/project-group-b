import React, { useState } from 'react';
import * as Yup from 'yup';
import "./index.css"

const AppForm = () => {

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
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
    email: Yup.string().email('Invalid email').required('This field is required'),
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
        // Validation passed, handle form submission
        console.log('Form submitted:', formData);
      })
      .catch((validationErrors) => {
        // Validation failed, update errors in state
        const formattedErrors = {} as any;
        validationErrors.inner.forEach((error:any) => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
      });
  };
  const fields = [
    {name: "fullname", type: "text", label: "Full Name", onChange: handleChange},
    {name: "email", type: "email", label: "Email", onChange: handleChange},
    {name: "username", type: "text", label: "Username", onChange: handleChange},
    {name: "password", type: "password", label: "Password", onChange: handleChange}
  ]
  return (
    <div className="login-form">
      <p className="form-title">Join Us</p>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AppForm;
