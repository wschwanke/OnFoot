//ScrollBar holds two sliders and the functions to update state on the App.

import React, { Component } from 'react';
import './css/Slider.css';

class ScrollBar extends Component {
  constructor (props) {
    super()
    this.state = {
    	location:1000,
      dollars: 1
    };
  }
  

  //These functions are exclusively for the radius slider
  onSubmit(event) {
    this.props.changeRadius(this.state.location);
  }
  onSlide(event) {
    this.setState({location: event.target.value});
   // console.log('Location changed to ', this.state.location);
  }
  
  //These are for the dollars slider.
  moneySubmit(event) {
    this.props.changeDollars(this.state.dollars);
  }
  moneySlide(event) {
    this.setState({dollars:event.target.value});
  }

  render(){
  	return (
  		<div>
  			<div className='slider-text'>How far away do you want to walk?</div>

  			<input type='range' name="meters" min="500" max="3000" onChange={this.onSlide.bind(this)}></input>

  			<button type='submit' onClick={this.onSubmit.bind(this)}>Submit</button>

        <div>How many dollaz?</div>

        <input type='range' name="dollars" min="1" max="4" onChange={this.moneySlide.bind(this)}></input>

        <button type='submit' onClick={this.moneySubmit.bind(this)}>Submit</button>
  		</div>
  	)
  }
}
export default ScrollBar;