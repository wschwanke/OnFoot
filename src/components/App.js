import React, { Component } from 'react';
import logo from '../logo.svg';
import './css/App.css';



class App extends Component {
  constructor () {
    super()
    this.state = {
      location: [`Please Wait`]
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
      navigator.geolocation.getCurrentPosition( (position) => {
        console.log("Success! latitude: ", position.coords.latitude, "longitude:", position.coords.longitude)
        this.setState({location :  [`latitude: ${position.coords.latitude}`,`longitude: ${position.coords.longitude}`]})
      });
    }
  }
  componentDidMount() {
    this.getLocation()
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

          {location[0]} <br/> {location[1]}
        </p>
      </div>
    );
  }
}

export default App;
