import React from 'react';
import './css/List.css';

import Item from './Item';

const List = ({data}) => {
  return (
    <div className="List">
    Places you may get to On-Foot:
    {data.results.map((result) =>
      <Item item={result} />
    )}
    </div>
  );
};

export default List;
