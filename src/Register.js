import React, {useState} from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import Style from './style.module.css';

export default function Register(prop) {
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()

  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState()

  function handleSubmit(e){
    e.preventDefault();

    axios.post("http://localhost:5000/register", {
      username: userName, 
      password: password
    }).then(data=>{
      if(data.data.result)
        setSuccess(true)
      else
        setMessage(data.data.message)
    });

  }

  return (
    <div className={Style.content}>
      <form onSubmit={handleSubmit}>

        <div className={Style.forms}>
            <h2>Register</h2>
            <span className={Style.message} style={{textAlign:'center'}}>{message}</span>
            <div className={Style.form_field}>
                <label htmlFor="username">Name: <p>(5-15 letters)</p></label>
                <input type='text' name='username' minLength={5} maxLength={15} id='username' required
                onChange={e=>setUserName(e.target.value)} />
            </div>
            <div className={Style.form_field}>
                <label htmlFor="password">Password:<p>(6-12 letters)</p></label>
                <input type='type' name='password' minLength={6} maxLength={12} id='password' required
                onChange={e=>setPassword(e.target.value)} />
            </div>
            <div className={Style.form_field}>
              <button type='submit'>Sign Up</button> 
            </div>
        </div>

      </form>
      {success && <Navigate to="/Login" replace={true} state="Successfully registered, please login." />}
      {prop.login && <Navigate to="/" replace={true} />}
    </div>
  )
}
