import React from 'react';
import Steps from './Steps'


const Directions = ({directions}) => {
  return (
      <div>
        <h2>Direction</h2>
        <Steps directions = {directions}/>
      </div>
  )
};

export default Directions;
