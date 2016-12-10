//Functional component to show logo, name and location.  Also has button to trigger App

import React from 'react';
import './css/Loading.css';
import ScrollBar from './ScrollBar';

// We pass hideButton and displayList in and because we're using ES6 we dont have to use bind or props
const Loading = ({changeRadius, location, hideButton, displayList}) => {
  const locationText = () => {
    console.log("location is...", location)
  if (location){
    return <div>{location}</div>
  }else{
    return <div id="fountainTextG"><div id="fountainTextG_1" className="fountainTextG">L</div><div id="fountainTextG_2" className="fountainTextG">o</div><div id="fountainTextG_3" className="fountainTextG">a</div><div id="fountainTextG_4" className="fountainTextG">d</div><div id="fountainTextG_5" className="fountainTextG">i</div><div id="fountainTextG_6" className="fountainTextG">n</div><div id="fountainTextG_7" className="fountainTextG">g</div><div id="fountainTextG_8" className="fountainTextG">.</div><div id="fountainTextG_9" className="fountainTextG">.</div><div id="fountainTextG_10" className="fountainTextG">.</div></div>
  }
}
  return (
    <div className='container loading'>
      <div className='row flex-items-xs-center'>
        <h1 className='col-xs'>Toof No!</h1>
      </div>
      <div className='row flex-items-xs-center'>
        <span className="col-xs-10 col-sm-8 col-md-7 col-lg-6 loading-location">{locationText()}</span>
      </div>
      <div className="row flex-items-xs-center">
      {
        //check if hideButton is false then hide the button
        hideButton ?
        null : <span className="button col-xs-8 col-sm-6 col-sm-4 col-lg-3" onClick={displayList}>Take me some place close!</span>
      }
      </div>
      <ScrollBar changeRadius={changeRadius}/>
    </div>
  );
};

export default Loading;
