import React from 'react';
import Step from './Step';

const Steps = ({directions}) => {
  var steps = directions.routes[0].legs[0].steps;
  return(
    <div>
      <h3>Instructions</h3>
      <ul>
      {
        steps.map((step)=>
          <Step item={step}  />
        )
      }
      </ul>
    </div>
  )
}

export default Steps;
