import React from 'react';
//import './css/Item.css';

const Item = ({item}) => {
  console.log(item);
  return (
    <li>
      <span className="ribbon icon"><a href="/fav" title="title">{item.rating}</a></span>
      <a href="#">
        {/*<span className="grid-number"></span>*/}
        <figure>
          <img src="http://placehold.it/800x600" alt="Photo of a restaurant" />
          <figcaption>
            
            <h2>{item.name}</h2>
            <h3>{item.vicinity}</h3>

          </figcaption>
        </figure>
      </a>
    </li>
    );
};

export default Item;