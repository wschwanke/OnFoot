import React, { Component } from 'react';
import './css/Slider.css';

class ScrollBar extends Component {
  constructor (props) {
    super()
    this.state = {
    	location:1000
    };
  }

  onSubmit() {
    this.props.changeRadius(this.state.location)
  }
  onSlide(event) {
    this.setState({location: event.target.value});
  }
  render(){
  	return (
  		<div>
  			<div className='slider-text'>How far away do you want to walk?</div>
  			<input type='range' name="miles" min="500" max="2500" onChange={this.onSlide.bind(this)}></input>
  			<button type='submit' onClick={this.onSubmit.bind(this)}>Submit</button>
  		</div>
  	)
  }
}
export default ScrollBar;