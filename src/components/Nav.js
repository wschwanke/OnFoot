//Functional component to show login/logout and show the savedRestaurants list.

import React, { Component } from 'react'
import './css/Nav.css';
import LoginButton from './LoginButton'
import getSaveRestaurant from './lib/getSaveRestaurant.js'

<<<<<<< 2b48ce93ff87b986e906adfd1dc76b9a26140c68
<<<<<<< 42d10f836a1540057efd485ec4ede0bceda70622

||||||| merged common ancestors
=======
<<<<<<< 69bb1dca78be26cd7b83caea2c06a0d44e4b3646
>>>>>>> Now saving all info into database
const Nav = ({toggleSavedRestaurants, isLogin, displayName, showSaveRestaurants}) => {
const displaySavedButton = () => {
    if (isLogin === false) {
||||||| merged common ancestors
const Nav = ({toggleSavedRestaurants, isLogin,displayName, showSaveRestaurants}) => {
const displaySavedButton = () => {
    if (isLogin===false){
=======
||||||| merged common ancestors
<<<<<<< 69bb1dca78be26cd7b83caea2c06a0d44e4b3646
const Nav = ({toggleSavedRestaurants, isLogin, displayName, showSaveRestaurants}) => {
const displaySavedButton = () => {
    if (isLogin === false) {
||||||| merged common ancestors
const Nav = ({toggleSavedRestaurants, isLogin,displayName, showSaveRestaurants}) => {
const displaySavedButton = () => {
    if (isLogin===false){
=======
=======
>>>>>>> Database is connected and functional. Rewriting list to now render saved items

class Nav extends Component {
  constructor (props) {
    super()
    this.state = {}
  }
  displaySavedButton() {
    if (this.props.isLogin===false){
      return
    } else {
      if (showSaveRestaurants === true) {
        return <button className="button" onClick={toggleSavedRestaurants}>Go back</button>
      } else {
        return <button className="button" onClick={toggleSavedRestaurants}>Show saved restaurants</button>
    } else{
      if (this.props.showSaveRestaurants===true){
        return <button>Go back</button>
      }else {
        return <button onClick={this.props.getSavedRestaurants}>Show saved restaurants</button>
      }
    } 
  }

  return (
    <nav className='row flex-items-xs-right h-nav'>
    {
      displayName ? <div className='col-xs col-sm col-md col-lg'><p className='nav-displayname' onClick ={showSaveRestaurants}>{displayName}</p></div>: null
    }
      {displaySavedButton()}
    {
      isLogin ? <div className='col-xs-5 col-sm-4 col-md-3 col-lg-2'><a className='button' href='/logout'>Logout</a></div> : <div className='col-xs-5 col-sm-4 col-md-3 col-lg-2'><a className='button' href='/login'>Login</a></div>
    }
    </nav>
  )
  render(){
    return(
      <nav className='row flex-items-xs-right h-nav'>
      {
        this.props.isLogin ? <div className='col-xs-5 col-sm-4 col-md-3 col-lg-2'><a className='button' href='/logout'>Logout</a></div> : <div className='col-xs-5 col-sm-4 col-md-3 col-lg-2'><a className='button' href='/login'>Login</a></div>
      }
      {
        this.displayName ? <div className='col-xs col-sm col-md col-lg'><p className='nav-displayname' onClick ={this.props.showSaveRestaurants}>{this.props.displayName}</p></div>: null
      }
      {this.displaySavedButton()}
      </nav>
    )
  }
}

export default Nav
