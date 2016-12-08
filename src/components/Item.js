import React, { Component } from 'react';
import './css/Item.css';
import postRestaurant from './lib/postRestaurant.js';
import DirectionsModal from './DirectionsModal';


class Item extends Component {
  constructor (props) {
    super()
    this.state = {};
  }

  directionsClick(e) {
    this.props.displayDirections(geolocation, this.props.item.id);
  }
  saveRestaurant(e) {
    e.preventDefault();
    console.log("name",this.props.item.place_id,"id",this.props.item.name);
    postRestaurant(item.place_id,item.name);
  }
  
  // this function turns `item.price_level` into a dollar sign level
  starRating(){
    let score =this.props.item.rating;
    let str=''
    for (let i=0;i<Math.floor(score);i++){
      str+='★';
    }
    return str;
  }
  priceLevel() {
    var result = '';
    for (var i = 0; i < this.props.item.price_level; i++) {
      result += '$';
    }
    return result;
  }
  
  render(){
    console.log(this.props.item);
    // variable string for link to Google maps directions
  let queryStr = "https://www.google.com/maps?saddr=My+Location&daddr=" + this.props.item.geometry.location.lat + "," + this.props.item.geometry.location.lng + "&dirflg=w"

  //get the latitude and longtitude of a restaurant
  var geolocation = `${this.props.item.geometry.location.lat},${this.props.item.geometry.location.lng}`;

  //url for google street view api
  var url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${geolocation}&key=${this.props.API}`
  let openText;
  if (this.props.item.opening_hours){
    if (this.props.item.opening_hours.open_now===true){
    openText="Open now"
    }else{
      openText="Closed now"
    }
  } else {
    openText="Unable to retrieve opening hours"
  }
    return (
    <li>
      <span className="ribbon icon"><a href="/fav" title="title">{this.props.item.rating}{this.starRating()}, {this.priceLevel()}</a></span>
      <a href="#">
        <span className="grid-number"><img src={this.props.item.icon} alt="Google maps icon" /></span>
        <figure>
          <img src={url} alt="Photo of a restaurant" />
          <figcaption>

            <h2>{this.props.item.name}</h2>
            <h3>{this.props.item.vicinity}</h3>
              <button className="loading-list-button">

              {/* Link to map directions */}
              <a href={queryStr}><h2>Go</h2></a></button>
              {
                this.props.isLogin ?
                <button className='try-btn' onClick={saveRestaurant}>Try it later</button> : null
              }
            <DirectionsModal item={this.props.item} directionsClick={this.directionsClick.bind(this)}/>
            <div>{openText}</div>
          </figcaption>
        </figure>
      </a>
    </li>
    );
  }
};

export default Item;
