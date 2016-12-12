//Functional component to show logo, name and location.  Also has button to trigger App

import React from 'react';
import './css/ManualAddressInput.css';

// We pass hideButton and displayList in and because we're using ES6 we dont have to use bind or props
const ManualAddressInput = (props) => {
  return (
    <span className='col-xs-10 col-sm-8 col-md-7 col-lg-6 loading-location'>
      <input className="loading-location-manualinput" type="text" value={props.manualAddress} onChange={props.handleManualAddressInput} placeholder='Type in your current address.'/>
    </span>
  )
}

export default ManualAddressInput;