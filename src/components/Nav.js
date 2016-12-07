import React from 'react'
import './css/Nav.css';
import LoginButton from './LoginButton'

const Nav = ({isLogin}) => {
  return(
    <div className="nav">
    {
      isLogin ? <a href="/logout">Logout</a> : <LoginButton login = {()=>Login()}/>
    }
    </div>

  )
}

export default Nav
