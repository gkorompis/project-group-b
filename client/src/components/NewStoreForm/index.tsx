import React, { useState } from 'react';
import * as Yup from 'yup';
import "./index.css"
import { useNavigate } from 'react-router-dom';

import axios from "axios"
import { BASE_URL, cookies } from '../../utils/global';
import { imgClose } from '../../assets/app-icons';
import { useDispatch } from 'react-redux';
import { accountAction, storeAction } from '../../actions';
import LoadingLogin from '../LoadingLogin';
import { SnackBarMui } from '..';

const NewStoreForm = ({handlers}:any) => {

  const cookiesAll = cookies.getAll();
  const {accessToken, sessionId, sessionRole} = cookiesAll;
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    store_name: "",
    store_category: "Lainnya",
    id_store: "",
    id_user: sessionId,
  }) as any

  interface FormErrors {
    store_name?: string;
    store_category?: string;
    id_store?: string;
    id_user?: string;
    }

  const [errors, setErrors] = useState<FormErrors>({}) as any;

  const validationSchema = Yup.object().shape({
    store_name: Yup.string().required('This field is required'),
    store_category: Yup.string().required('This field is required'),
    id_store: Yup.string().required('This field is required'),
    id_user: Yup.string().required('This field is required')
  });
  const {setIsNewStoreForm } = handlers
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
        store_category: "",
        id_store: "",
        id_user: '',
      });
      // post route
      try {
        
        const token = accessToken
        const config = {
          headers: {Authorization: `Bearer ${token}`}
        }
        const response = await axios.post(`${BASE_URL}/stores`, formData, config); 
        setSeverity('success');
        setIsLoading(false);
        setOpenSnackBar(!openSnackBar);
        setErrorMessage("create success!");
        console.log(">>response", response)
        dispatch(storeAction({reduxState: {token, sessionId, sessionRole}}) as any)
        // dispatch({type: "RELOAD_PRODUCTS_LOADING"})
        setIsNewStoreForm(false)
        
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
    {name: "store_name", type: "text", label: "Store Name", onChange: handleChange},
    {name: "store_category", type: "text", label: "Store Category", onChange: handleChange},
    {name: "id_store", type: "text", label: "Unique Id Store", onChange: handleChange},
    {name: "id_user", type: "text", label: "Id User", onChange: handleChange}
  ]
  return (
    <>
    <div className="login-form">
      <div className="form-bar"><img className="basket-close-img" src={imgClose} onClick={()=> setIsNewStoreForm(false)}/></div>
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

export default NewStoreForm;
