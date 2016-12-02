import React, { Component } from 'react';
import logo from '../logo.svg';
import './css/App.css';
import getRestaurants from './lib/getRestaurants.js'

import List from './List';
import data from './data/data.js'

class App extends Component {
  constructor (props) {
    super()
    this.state = {
      map: undefined,
      //original value so that its not just undefined
      location: [`Please Wait`],
      data:data, //Using static data for now for rendering, please replace with data from server.
      rest: ['default']
    };
  }

  getLocation() {
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
      }
      else {
      console.log('Geolocation is not supported for this Browser/OS.');
      }
    // Get the user's location:
    if (navigator.geolocation) {
      //use an arrow function to not lose the this binding
      navigator.geolocation.getCurrentPosition( (position) => {
        console.log('position object: ',position)
        console.log("Success! latitude: ", position.coords.latitude, "longitude:", position.coords.longitude)
        //we set the state to the location we now have, split into two (not needed) to better manipulate for viewing
        this.setState({location :  [`latitude: ${position.coords.latitude}`,`longitude: ${position.coords.longitude}`]})
      });
    }
  }
  // get all the restaurants nearby
  getNearbyRestaurants(location){
    getRestaurants((restaurants) => {
      this.setState({data:restaurants});
    })
  }

  //this waits till you have rendered something to then run anything in here
  componentDidMount() {
    this.getLocation()
    this.getNearbyRestaurants();
  }
  render() {
    //set to a variable for a little better readability
    var location = this.state.location
    //sets the data to the data variable
    var data = this.state.data
    console.log("rest",this.state.rest);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">

          {location[0]} <br/> {location[1]}
        </p>

        <List data={data}/>

      </div>
    );
  }
}

export default App;
