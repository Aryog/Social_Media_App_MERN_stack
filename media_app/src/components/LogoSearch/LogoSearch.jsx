import React from 'react'
import Logo from "../../img/logo.png"
import "./LogoSearch.css"
const LogoSearch = () => {
  return (
    <div className='LogoSearch'>
        <img src={Logo} alt=""/>
        <div className='Search'>
            <input type="text" name="text" placeholder='#Explore' />
            <div className="s-icon" style={{paddingLeft:'1rem', alignItem:'center'}}>
            <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    </div>
  )
}

export default LogoSearch