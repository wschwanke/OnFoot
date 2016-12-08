//Shows the restaurants found with the appropriate search by rendering one instance of item for each of them.
import React from 'react';
import './css/List.css';

import Item from './Item';
import DirectionsModal from './DirectionsModal';

const List = ({data, isLogin, showDirections, displayDirections, API}) => {

  return (
    <div className="list">
        <div className="list-header-container"><h3>Top-rated restaurants near you</h3></div>
         <main role="main">
          <ul className="flexgrid columns-news">

        {
          data === undefined ? null :
          //filters the data right here
          // Renders one Item for data in the list.
            data.results.filter(result => result.rating >= 3.9 && result.price_level < 3)
            .map((result) =>
            <Item item={result} API={API} isLogin={isLogin} showDirections={showDirections} displayDirections={displayDirections}/>
            )
        }
        </ul>
      </main>
    </div>
  );
};

export default List;
