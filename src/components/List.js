import React from 'react';
import './css/List.css';

import Item from './Item';

const List = ({data, showDirections, displayDirections, API}) => {

  return (
    <div className="list">
        <div className="list-header-container"><h3>Top-rated restaurants near you</h3></div>
         <main role="main">
          <ul className="flexgrid columns-news">

        {
          data === undefined ? null :
          //filters the data right here
            data.results.filter(result => result.rating >= 3.9 && result.price_level < 3)
            .map((result) =>
            <Item item={result} API={API} showDirections={showDirections} displayDirections={displayDirections}/>
            )
        }

        </ul>
      </main>
    </div>
  );
};

export default List;
