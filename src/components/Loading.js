import React from 'react';
import './css/Loading.css';

const Loading = ({location, hideButton, displayList}) => {
  return (
   <div className="loading-container">
   
     <h1>On-FoOt!</h1>
     <img src="/static/foot_logo_white.png" alt="on-foot"/>
     <h5>Hyper-Local GeoLocation</h5>
     <div className="location-loading-container"><h5>{location}</h5></div>  

        {//check if hideButton is false then hide the button
          hideButton ?
          null : <button className="load-list-button" onClick={displayList}>Restaurants</button>
        }

   </div>/*end loading container*/
        
  );
};

export default Loading;



 