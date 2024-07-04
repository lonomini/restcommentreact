import React from 'react'

import Style from './style.module.css';

export default function Comment(Prop) {
  return (
    <div className={Style.view_comment}>
        <h3>{Prop.content.title}
            { [...Array(Prop.content.comment_rating)].map( (i, k) => <span key={k} className={Style.material_icons}>star</span>) }
        </h3>
        <div className={Style.comment_info}>
            <span>{Prop.content.user}</span>            
            <span>{new Date(Prop.content.date_created).toLocaleDateString()}</span>
        </div>
        <div className={Style.comment_content}>
            <p>{Prop.content.comment}</p>
        </div>        
    </div>
  )
}
