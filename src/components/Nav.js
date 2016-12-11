import React, { Component } from 'react'
import './css/Nav.css';
import LoginButton from './LoginButton'
import getSaveRestaurant from './lib/getSaveRestaurant.js'


class Nav extends Component {
  constructor (props) {
    super()
    this.state = {}
  }

  displaySavedButton() {
    if(this.props.isLogin===false){
      return
    } else{
      if(this.props.showSaveRestaurants===true){
        return <button className='button' onClick={this.props.getOutOfSavedList}>Go back</button>
      }else {
        return <button className='button' onClick={this.props.getSavedRestaurants}>Show saved restaurants</button>    
      }
    }
  }


  render(){
    return (
    <nav className='row flex-items-xs-right h-nav'>
    {
      this.props.displayName ? <div className='col-xs col-sm col-md col-lg'><p className='nav-displayname'>{this.props.displayName}</p></div>: null
    }
      {this.displaySavedButton()}
    {
      this.props.isLogin ? <div className='col-xs-5 col-sm-4 col-md-3 col-lg-2'><a className='button' href='/logout'>Logout</a></div> : <div className='col-xs-5 col-sm-4 col-md-3 col-lg-2'><a className='button' href='/login'>Login</a></div>
    }
    </nav>
    )
  }
}

export default Nav
