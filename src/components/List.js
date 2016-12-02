import React from 'react';
import './css/List.css';

import Item from './Item';

const List = () => {
  return (
    <div className="List">

    This is our List View!
    <Item />
    <Item />

    </div>);
};

export default List;