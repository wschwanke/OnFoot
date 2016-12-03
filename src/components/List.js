import React from 'react';
import './css/List.css';

import Item from './Item';

const List = ({data}) => {
  return (
    <div className="List">
        Places you may get to On-Foot:
      <main role="main">
        <ul className="flexgrid columns-news">
        
        {data.results.map((result) =>
          <Item item={result} />
        )}

        </ul>
      </main>
    </div>
  );
};

export default List;
