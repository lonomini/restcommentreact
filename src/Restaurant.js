import React from 'react';
import {Link} from 'react-router-dom';

import Style from './style.module.css';

export default function Restaurant(prop) {
  return (
    <div className={Style.rest_list}>
      <img src={process.env.PUBLIC_URL+'/shop/'+prop.detail.img}></img>
      <h2>[{prop.detail.type_name}] <Link to={"detail/"+prop.detail.id}>{prop.detail.rest_name}</Link><br/><span>({prop.detail.num_comment} reviews)</span></h2>      
    </div>
  )
}
