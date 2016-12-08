//Functional component to show login/logout and show the savedRestaurants list.

import React from 'react'
import './css/Nav.css';
import LoginButton from './LoginButton'
import getSaveRestaurant from './lib/getSaveRestaurant.js'

const Nav = ({isLogin,displayName, showSaveRestaurants}) => {

  return(
    <nav className='row flex-items-xs-right h-nav'>
    {
      isLogin ? <div className='col-xs-2'><a className='nav-login' href='/logout'>Logout</a></div> : <div className='col-xs-2'><a className='nav-login' href='/login'>Login</a></div>
    }
    {
      displayName ? <div className='col-xs'><p className='nav-displayname' onClick ={showSaveRestaurants}>{displayName}</p></div>: null
    }
    </nav>
  )
}

export default Nav
