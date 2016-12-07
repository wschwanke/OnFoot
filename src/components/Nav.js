import React from 'react'
import './css/Nav.css';
import LoginButton from './LoginButton'

const Nav = ({isLogin,displayName}) => {
  return(
    <div className="nav">
    {
      isLogin ? <a href="/logout">Logout</a> : <LoginButton login = {()=>Login()}/>
    }
    {
      displayName ? <p>{displayName}</p>: null
    }
    </div>

  )
}

export default Nav
