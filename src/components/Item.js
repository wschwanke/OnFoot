import React from 'react';
//import './css/Item.css';

const Item = ({item}) => {
  // variable string for link to Google maps directions
  var queryStr = "https://www.google.com/maps?saddr=My+Location&daddr=" + item.geometry.location.lat + "," + item.geometry.location.lng + "&dirflg=w"
  return (
    <li>
      <span className="ribbon icon"><a href="/fav" title="title">{item.rating}</a></span>
      <a href="#">
        <span className="grid-number"><img src={item.icon} alt="Google maps icon" /></span>
        <figure>
          <img src="./static/placeholder_logo_img_black.png" alt="Photo of a restaurant" />
          <figcaption>
            
            <h2>{item.name}</h2>
            <h3>{item.vicinity}</h3>
              <button className="loading-list-button">
            {/* Link to map directions */}
                <h2><a href={queryStr}>Go</a></h2>
              </button>

          </figcaption>
        </figure>
      </a>
    </li>
    );
};

export default Item;
