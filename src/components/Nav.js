//Functional component to show login/logout and show the savedRestaurants list.

import React from 'react'
import './css/Nav.css';
import LoginButton from './LoginButton'
import getSaveRestaurant from './lib/getSaveRestaurant.js'

const Nav = ({isLogin,displayName, showSaveRestaurants}) => {

  return(
    <div className="nav">
    {
      isLogin ? <a href="/logout">Logout</a> : <LoginButton login = {()=>Login()}/>
    }
    {
      displayName ? <p onClick ={showSaveRestaurants}>{displayName}</p>: null
    }
    </div>

  )
}

export default Nav
