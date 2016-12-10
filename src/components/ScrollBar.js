import React, { Component } from 'react';
import './css/Item.css';

class ScrollBar extends Component {
  constructor (props) {
    super()
    this.state = {
    	location:1000
    };
  }

  onSubmit(event) {
    this.props.changeRadius(this.state.location);
  }
  onSlide(event) {
    this.setState({location: event.target.value});
   // console.log('Location changed to ', this.state.location);
  }
  render(){
  	return (
  		<div>
  			<div>How far away do you want to go?</div>

  			<input type='range' name="meters" min="500" max="3000" onChange={this.onSlide.bind(this)}></input>

  			<button type='submit' onClick={this.onSubmit.bind(this)}>Submit</button>
  		</div>
  	)
  }
}
export default ScrollBar;