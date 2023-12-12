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
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    age: Yup.number().positive('Age must be a positive number').required('Age is required'),
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
        {/* <div className="form-group">
          <label className="form-label" htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label className="" htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label className="" htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <div className="text-danger">{errors.age}</div>}
        </div> */}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AppForm;
