import React, { Component, useEffect, useState, useRef } from "react";
import { icons } from "./Icons";
import { Link } from "react-router-dom";


function SideBar({props}){
console.log('-----------')

console.log(props.profile.id)


console.log('-----------')

return(
<div className="leftBar">
<div className='containerLeft'>
<div className='left'>
    <div className='picframe'>{props.profile.picture?<img className='picture' src={props.profile.picture} />:props.profile.gender==='kişi'?icons.guy_prof:props.profile.gender==='qadın'?icons.girl_prof:null}</div>
    <div>Ad: {props.profile.name}</div>
    <div>Soyad: {props.profile.last_name}</div>
    <div>{props.profile.gender?props.profile.gender[0].toUpperCase()+props.profile.gender.substring(1, props.profile.gender.length):null}</div>
<div className="menuWrapper">


<ul className="menuList">
<li className="listItem"><Link to={"timeline/"+props.profile.id} className="no-decoration flex align-items-center">{icons.events}<span className="listItemText">Həyat yolum</span></Link></li>
<li className="listItem d-n">{icons.videos}<span className="listItemText">Videolar</span></li>
<li className="listItem d-n">{icons.chat}<span className="listItemText">Çat</span></li>

</ul>
</div>
</div>
<div>
</div>
</div>
</div>)
}

export {
    SideBar
};