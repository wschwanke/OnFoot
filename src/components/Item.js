import React from 'react';
import './css/Item.css';

const Item = ({item}) => {
  console.log(item);
  return (
    
    <div className="Item">
      <div>
        <img src={item.icon} />
      </div>
      <div> NAME: {item.name} </div>
      <div> RATING: {item.rating} </div>
      <div> VICINITY: {item.vicinity} </div>
    </div>

    );
};

export default Item;