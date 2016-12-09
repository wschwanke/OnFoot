import React, { Component } from 'react';
import './css/Item.css';

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
    //every time the user types a new letter, the state is changed to the current input
    this.setState({location: event.target.value});
  }
  render(){
  	return (
  		<div>
  			<div>How far away do you want to go?</div>
  			<input type='range' name="miles" min="500" max="2500" onChange={this.onSlide.bind(this)}></input>
  			<button type='submit' onClick={this.onSubmit.bind(this)}>Submit</button>
  		</div>
  	)
  }
}
export default ScrollBar;