import React from 'react';
import Steps from './Steps'
import './css/Directions.css';


const Directions = ({directions}) => {
  return (
      <div>
        <h2>Directions</h2>
        <Steps directions = {directions}/>
      </div>
  )
};

export default Directions;
