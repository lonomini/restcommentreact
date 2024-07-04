import React, { useState } from 'react'

import Style from './style.module.css';

export default function PostComment(props) {
    
    const [Text, setText] = useState('')
    const [Rate, setRate] = useState()
    const [Title, setTitle] = useState('')
    const [message, setMessage] = useState()

    function handlePost(){
        if(Text === ""){
            setMessage("Comment is still empy.");
            return;
        }
        if(Rate === null){
            setMessage("Please give a score.");
            return;
        }
        if(Title === ''){
            setMessage("Please give a title.");
            return;
        }
        props.onPost(Title, Text, Rate);
        setText('')
        setTitle('')
        setRate()
        setMessage()
    }

    return (
    <div className={Style.postcomment}>
        <h3>Write Comment:</h3>
        <p className={Style.message}>{message}</p>
        <input className={Style.comment_heading} type='text' value={Title} placeholder='Give a Heading' name='commentheading' onChange={(e)=>setTitle(e.target.value)}/>
        <textarea id="comment" placeholder='Comment' onChange={(e) => setText(e.target.value)} value={Text}></textarea>
        <br/>Rate (higher score is better): 
        <input type='radio' value="1" name='rate' checked={Rate == 1} onChange={(e)=>setRate(e.target.value)} />1
        <input type='radio' value="2" name='rate' checked={Rate == 2} onChange={(e)=>setRate(e.target.value)} />2
        <input type='radio' value="3" name='rate' checked={Rate == 3} onChange={(e)=>setRate(e.target.value)} />3
        <input type='radio' value="4" name='rate' checked={Rate == 4} onChange={(e)=>setRate(e.target.value)} />4
        <input type='radio' value="5" name='rate' checked={Rate == 5} onChange={(e)=>setRate(e.target.value)} />5
        <br/>
        <button onClick={handlePost}>Post</button>
    </div>
  )
}
