import React, { useRef, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Axios from "axios";


const Nominate = () => {

    const { token } = useParams();
    const [formRegister, setRegister] = useState([{ _id: '', nomineename: '', nomineeemail: '', description: '', nominatedby: ''}]);
    const { handleSubmit, register, formState: { errors } } = useForm();

    const onChange = (e) => {
        e.persist();
        setRegister({ ...formRegister, [e.target.name]: e.target.value });
      }

    const onSubmit = () => {
        const formData = new FormData();
        for(let key in formRegister) {
            formData.append(key,formRegister[key]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data' 
            }
          }
        const fetchData = async () => {
            try {
                const res = await Axios.put('http://localhost:8000/service/nominateperson', formData, config);
                if (res.data) {
                    console.log("Link token created:" + res.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData(); 
    }

    return (
        <div className="App">
            <h1>Nominate Person</h1>
            <form onSubmit={handleSubmit(onSubmit)}  className="linkForm inputForm">
                <div className="inputField" >
                    <input name="nomineename" 
                    placeholder="nominate a person" 
                    type="text" 
                    {...register('nomineename',{
                        required: "Nominate a person is required !",
                        pattern: {
                          value: /^[a-zA-Z\s]/,
                          message: "Invalid name !"
                        }
                      })
                    }
                      onChange={onChange}
                    /> 
                    <span className="loginErrorTextFormat">{errors.nomineename && errors.nomineename.message}</span>
                </div>
                <div className="inputField" >
                    <input name="email" 
                    placeholder="nominee email" 
                    type="text" 
                    {...register('email',{
                        required: "Email is required !",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                           message: "Invalid email address !"
                        }
                      })}
                      onChange={onChange}
                    /><b></b>
                    <span className="loginErrorTextFormat">{errors.email && errors.email.message}</span>
                </div>
                <div className="inputField" >
                    <textarea name="description" 
                    placeholder="reason for nomination"  
                    maxLength={1000}
                    {...register('description',{
                        required: "Description is required !"
                      })}
                      onChange={onChange}
                    />
                   <span className="loginErrorTextFormat">{errors.description && errors.description.message }</span> 
                </div>
                <div className="inputField nominatedby" >
                    <input name="nominatedby" 
                    placeholder="nominated by" 
                    type="text" 
                    {...register('nominatedby',{
                        required: "Nominate by is required !",
                        pattern: {
                          value: /^[a-zA-Z\s]{2,30}$/,
                          message: "Invalid name !"
                        }
                      })}
                      onChange={onChange}
                    /> 
                    <span className="loginErrorTextFormat">{errors.nominatedby && errors.nominatedby.message}</span>
                </div>
                <span className="getlinkbutton">
                    <input type="submit"/>
                </span>
            </form>
        </div>
    )
}

export default Nominate