import React from 'react';
import './css/Directions.css';

var Step = ({item}) => {
  return(
    <li>
      { //replace all b tags with space
        item.html_instructions.replace(/[<b>,</b>]/g,"")
      }
    </li>
  )
}

export default Step;
