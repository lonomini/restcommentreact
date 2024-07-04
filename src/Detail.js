import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import PostComment from "./PostComment.js";
import Comment from './Comment.js';

import Style from './style.module.css';

export default function Detail(prop) {

    let params = useParams()
    let [comments, setComments] = useState([])
    let [details, setDetails] = useState({})
    let [message, setMessage] = useState()
    let [star, setStar] = useState(1)

    function loadComment(){
      axios.get("https://restcommentexpress.onrender.com/comment/"+params.id)
      .then((data)=>{
          setComments(data.data)
      });
    }

    function loadRating(){
      axios.get("https://restcommentexpress.onrender.com/shop/"+params.id).then( (data) => {
        setDetails(data.data[0])
        let star = Math.round(data.data[0].rating);
        setStar(star);
      }).catch(err => setMessage("Connection fail."));
    }

    useEffect(()=>{
        axios.get("https://restcommentexpress.onrender.com/shop/"+params.id).then( (data) => {
            setDetails(data.data[0])
            let star = Math.round(data.data[0].rating);
            setStar(star);
          }).catch(err => setMessage("Connection fail."));

        axios.get("https://restcommentexpress.onrender.com/comment/"+params.id)
        .then((data)=>{
            setComments(data.data)
        }).catch(err => setMessage("Connection fail."));

    }, [params.id])


  function handlePostComment(title, text,rate){
    axios.post("https://restcommentexpress.onrender.com/addComment", {
      rest_id: params.id,
      title: title,
      comment: text,
      comment_rate: rate,
      username: sessionStorage.getItem("name"),
      userid: sessionStorage.getItem("userid"),
      token: sessionStorage.getItem("token")
    }).then( (data) => {
      if(data.data.result){
        loadComment()
        loadRating()
        sessionStorage.setItem("token", data.data.token)
      }else{
        if(data.data.errorCode === 1){
            prop.setLogin(false)
            sessionStorage.removeItem("name")
            sessionStorage.removeItem("login")
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("userid")
            setMessage(data.data.message)
        }
      }      
    });
  }

  return (
    <div className={Style.content}>
      <div className={Style.rest_detail}>
          <img src={process.env.PUBLIC_URL+'/shop/'+details.img}/>
          <div>
            <h2>{details.rest_name}<br/>
              { [...Array(star)].map( (i, k) => <span key={k} className={Style.material_icons}>star</span>) }
            </h2>      
            <p>{details.address}</p>
            <p>{details.phone}</p>
          </div>          
      </div>
      <hr/> 
      <p className={Style.message}>{message}</p>      
      {
          comments.length > 0 ?
          comments.map((item, key)=><Comment key={key} content={item}></Comment>)
          :
          <p style={{background:"white", padding:"10px 0", textAlign:"center"}}>No comment yet.</p>
      }
      <hr/>
      {prop.login && <PostComment onPost={handlePostComment}></PostComment>}
    </div>
  )
}
