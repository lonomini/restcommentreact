import React, {useState} from 'react'
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import Server from './Server.js';

import Style from './style.module.css';

export default function Login(prop) {
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()
  const [message, setMessage] = useState()
  const location = useLocation()

  function handleLogin(e){
    e.preventDefault();

    axios.post(Server+"login", {
      username: userName, 
      password: password
    }).then(data=>{
        if(data.data.login){
            setMessage()
            prop.setLogin(true)
            sessionStorage.setItem("name", data.data.name)
            sessionStorage.setItem("userid", data.data.userid)
            sessionStorage.setItem("login", true)
            sessionStorage.setItem("token", data.data.accessToken)
        }else{
            setMessage(data.data.message)
        }
    });

  }

  return (
    <div className={Style.content}>
      <p style={{color: 'red', textAlign: 'center'}}>{location.state}</p>
      <form onSubmit={handleLogin}>
        <div className={Style.forms}>
          <h2>Login</h2>
          <div className={Style.form_field}>
            <label htmlFor="username">Name: </label>
            <input type='text' name='username' id='username' required
            onChange={e=>setUserName(e.target.value)} />
          </div>
          <div className={Style.form_field}>
            <label htmlFor="password">Password:</label>
            <input type='password' name='password' id='password' required
            onChange={e=>setPassword(e.target.value)} />
          </div>
          <div className={Style.form_field}>
            <button type='submit'>Sign in</button> 
          </div>
          <div className={Style.form_field}>
            <p className={Style.message}>{message}</p>
          </div>
        </div>
      </form>
      {prop.login && <Navigate to="/" replace={true} state="Login successfully. Welcome foodie!" />}
    </div>
  )
}
