import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import Restaurant from "./Restaurant.js";
import { useLocation } from 'react-router-dom';

import Style from './style.module.css';

export default function Home() {

  let [Restlist, setRestlist] = useState([])
  let [message, setMessage]     = useState()
  const location = useLocation()

    useEffect(()=>{
      axios.get("https://restcommentexpress.onrender.com/",{
        headers: {
          "username": sessionStorage.getItem("name") || null,
          "token": sessionStorage.getItem("token") || null
        }
      }).then( (data) => {
        setRestlist(data.data)
      }).catch(err=>{
        setMessage("Connection fail.")
      })
    },[])

  return (
    <div className={Style.content}>
      <p className={Style.message}>{location.state || message}</p>
        {
            Restlist.map((item, key) => <Restaurant key={key} detail={item}/>)
        }
    </div>
  )
}
