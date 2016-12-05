import React from 'react';
import './css/Loading.css';

const Loading = ({location}) => {
  return (
   <div className="loading-container">
     <h1>On-FoOt!</h1>
     <img src="/static/foot_logo_white.png" alt="on-foot"/>
     <h5>Hyper-Local GeoLocation</h5>
     <div className="location-loading-container"><h5>{location}</h5></div>
   </div>
 
  );
};

export default Loading;