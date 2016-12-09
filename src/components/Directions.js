import React from 'react';
import Steps from './Steps'
import './css/Directions.css';


const Directions = ({directions}) => {
  return (
      <div>
        <div className="directions-list-container">
        <h2>Directions</h2>
        <Steps directions = {directions}/>
      	</div>
      </div>
  )
};

export default Directions;
