import React, { Component } from 'react';
import './css/Slider.css';

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
<<<<<<< 14e6dc3b7f2298c0bfa232f43ea8ad07791d8c7b
  			<div className='slider-text'>How far away do you want to walk?</div>
=======
  			<div>How far away do you want to go?</div>
<<<<<<< 796697d8e15946b441190143422c69765edababc
<<<<<<< 9d7e7fca5060a087b456d2700c17c0c7de889e9c
>>>>>>> Rebasing to get most recent changes.
  			<input type='range' name="miles" min="500" max="2500" onChange={this.onSlide.bind(this)}></input>
=======
=======

>>>>>>> Slider functionality integrated.
  			<input type='range' name="meters" min="500" max="3000" onChange={this.onSlide.bind(this)}></input>

  			<button type='submit' onClick={this.onSubmit.bind(this)}>Submit</button>
  		</div>
  	)
  }
}
export default ScrollBar;