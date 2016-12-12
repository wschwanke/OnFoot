//Shows the restaurants found with the appropriate search by rendering one instance of item for each of them.
import React from 'react';
import './css/List.css';

import Item from './Item';

const List = ({dollars, radius, data, isLogin, showSaveRestaurants, displayDirections, API, objLatLng}) => {
  return (
    <div className='container list'>
      <div className='row list-header'>
        <h2 className='col-xs'>Restaurants Near You</h2>
     </div>
      <div className='container list-location'>
        <ul className='row'>
          {
            data === undefined || null ? <h4>Finding results...</h4> :
            //filters the data right here
            // Renders one Item for data in the list.
            //data.results.filter(result => result.rating >= 3.0 && result.price_level <= dollars)
            data.results.filter(result => {
              
              let distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(parseFloat(objLatLng.lat), parseFloat(objLatLng.lng)), new google.maps.LatLng(parseFloat(result.geometry.location.lat), parseFloat(result.geometry.location.lng)));
              if (distance <= radius && result.price_level <= dollars)
                return true
              else
                return false
            })
            .map((result) =>
              <Item item={result} API={API} isLogin={isLogin} displayDirections={displayDirections}/>
            )
          }
        </ul>
      </div>
    </div>
  );
};

export default List;
