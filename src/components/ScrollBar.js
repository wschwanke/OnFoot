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
    this.setState({location: event.target.value});
  }
  render(){
  	return (
  		<div>
  			<div>How far away do you want to go?</div>
<<<<<<< 9d7e7fca5060a087b456d2700c17c0c7de889e9c
  			<input type='range' name="miles" min="500" max="2500" onChange={this.onSlide.bind(this)}></input>
=======
  			<input type='range' name="meters" min="500" max="3000" onChange={this.onSlide.bind(this)}></input>
>>>>>>> Rebasing to get most recent changes.
  			<button type='submit' onClick={this.onSubmit.bind(this)}>Submit</button>
  		</div>
  	)
  }
}
export default ScrollBar;