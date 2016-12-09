//Shows the restaurants found with the appropriate search by rendering one instance of item for each of them.
import React from 'react';
import './css/List.css';

import Item from './Item';
import DirectionsModal from './DirectionsModal';

<<<<<<< 757215ec029eb952fe7f2acacfba47c2c4b79b68
const List = ({data, isLogin, showDirections, displayDirections, API}) => {
||||||| merged common ancestors
const List = ({data, isLogin, showDirections, displayDirections, API}) => {

=======
const List = ({data, isLogin, displayDirections, API}) => {
  console.log("List is showing whether we're logged in or not....", isLogin)
>>>>>>> Fixed slider bar
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
            data.results.filter(result => result.rating >= 3.9 && result.price_level < 3)
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
