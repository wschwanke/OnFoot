//Shows the restaurants found with the appropriate search by rendering one instance of item for each of them.
import React from 'react';
import './css/List.css';

import Item from './Item';
<<<<<<< 2b48ce93ff87b986e906adfd1dc76b9a26140c68
import DirectionsModal from './DirectionsModal';

const List = ({dollars, data, isLogin, displayDirections, API}) => {
  //console.log("List is showing whether we're logged in or not....", isLogin)
  

||||||| merged common ancestors
import DirectionsModal from './DirectionsModal';
const List = ({data, isLogin, showSaveRestaurants, displayDirections, API}) => {
=======

const List = ({data, isLogin, showSaveRestaurants, displayDirections, API}) => {
>>>>>>> Database is connected and functional. Rewriting list to now render saved items
  return (
    <div className='container list'>
      <div className='row list-header'>
        <h2 className='col-xs'>Top-rated restaurants</h2>
     </div>
      <div className='container list-location'>
        <ul className='row'>
          {
            data === undefined ? null :
            //filters the data right here
            // Renders one Item for data in the list.
            data.results.filter(result => result.rating >= 3.0 && result.price_level <= 3)
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
