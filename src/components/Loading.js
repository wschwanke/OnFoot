//Functional component to show logo, name and location.  Also has button to trigger App

import React from 'react';
import './css/Loading.css';

// We pass hideButton and displayList in and because we're using ES6 we dont have to use bind or props
const Loading = ({location, hideButton, displayList}) => {
  return (
    <div className='container loading'>
      <div className='row flex-items-xs-center'>
        <h1 className='col-xs'>Toof No!</h1>
      </div>
      <div className='row flex-items-xs-center'>
        <span className="col-xs-10 col-sm-8 col-md-7 col-lg-6 loading-location">{location}</span>
      </div>
      <div className="row flex-items-xs-center">
      {
        //check if hideButton is false then hide the button
        hideButton ?
        null : <span className="button col-xs-8 col-sm-6 col-sm-4 col-lg-3" onClick={displayList}>Take me some place close!</span>
      }
      </div>
    </div>
  );
};

export default Loading;
