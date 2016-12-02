import React, { Component } from 'react';
import logo from '../logo.svg';
import './css/App.css';



class App extends Component {
  constructor () {
    super()
    this.state = {
      location: `${this.getLocation.apply(this)}`
    };
  }

  getLocation() {
    var that = this
    console.log(that)
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
     // return '';
      }
      else {
      console.log('Geolocation is not supported for this Browser/OS.');
      }
    // Get the user's location:
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Success! latitude: ", position.coords.latitude, "longitude:", position.coords.longitude)
        console.log(this)
        
        that.setState({location :  `latitude: " + {position.coords.latitude} + "<br>longitude: " + {position.coords.longitude}`})
     
       //.done(function(data) {
          // $('body').append("#dummy-restaurant");
//})
      });
    }
  }

  render() {
    var location = this.state.location
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">

          To get started, edit <code>src/App.js</code> {location}and save to reload.
        </p>
      </div>
    );
  }
}

export default App;