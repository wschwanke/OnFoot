import React from 'react';
// import streetViewApi from './env/config.js'
//import './css/Item.css';

const Item = ({item,API,showDirections,displayDirections}) => {
  
  // preventDefault on directionsClick
  function directionsClick(e) {
    e.preventDefault();
    displayDirections(geolocation, item.id);
  }
  // variable string for link to Google maps directions
  var queryStr = "https://www.google.com/maps?saddr=My+Location&daddr=" + item.geometry.location.lat + "," + item.geometry.location.lng + "&dirflg=w"

  //get the latitude and longtitude of a restaurant
  var geolocation = `${item.geometry.location.lat},${item.geometry.location.lng}`;

  //url for google street view api
  var url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${geolocation}&key=${API}`

  // this function turns `item.price_level` into a dollar sign level
  var priceLevel = function() {
    var result = '';
    for (var i = 0; i < item.price_level; i++) {
      result += '$';
    }
    return result;
  }
  //
  return (
    <li>
      <span className="ribbon icon"><a href="/fav" title="title">{item.rating}, {priceLevel()}</a></span>
      <a href="#">
        <span className="grid-number"><img src={item.icon} alt="Google maps icon" /></span>
        <figure>
          <img src={url} alt="Photo of a restaurant" />
          <figcaption>

            <h2>{item.name}</h2>
            <h3>{item.vicinity}</h3>
            <h4 className="directions-list">              
              {item.directions && item.directions.map((x) => {
                return (<h5>{x}</h5>)
              })}
              
            </h4>
              <button className="loading-list-button">
           
                {/* Link to map directions */}
                <a href={queryStr}><h2>Go</h2></a></button>
                
                {/* Show directions in app */}
              <button onClick={actionClick}>Get Directions</button>

          </figcaption>
        </figure>
      </a>
    </li>
    );
};

export default Item;
