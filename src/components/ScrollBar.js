//ScrollBar holds two sliders and the functions to update state on the App.

import React, { Component } from 'react';
import './css/Slider.css';

const ScrollBar = (props) => {
	return (
		<div className='row flex-items-xs-left'>
      <div className="col-xs-6">
  			<div className='slider-text'>How far would you like to walk?</div>
  			<input type='range' name="meters" min="500" max="3000" onChange={props.handleRadiusFilter} value={props.radius}/>
      </div>
      <div className="col-xs-6">
        <div>What is your price range?</div>
        <input type='range' name="dollars" min="1" max="4" onChange={props.handlePriceFilter} value={props.dollars}/>
      </div>
		</div>
	)
}
export default ScrollBar;