import React, { Component } from 'react';
import logo from '../logo.svg';
import './css/App.css';
import getRestaurants from './lib/getRestaurants.js'
import getAddress from './lib/getAddress.js'
import getDirections from './lib/getDirections.js'

import List from './List';
import Directions from './Directions';
import Loading from './Loading';
import data from './data/data.js';

class App extends Component {
  constructor (props) {
    super()
    this.state = {
      //original value so that its not just undefined
      location: `Getting your location...`,
      latlong:undefined,
      data:undefined,
      showList: false,
      hideButton: false,
      showDirections: false,
      directions: undefined
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
      //watchPosition will continually get the user's location
      navigator.geolocation.watchPosition( (position) => {
        console.log("Success! latitude: ", position.coords.latitude, "longitude:", position.coords.longitude)
        this.setState({latlong:`${position.coords.latitude},${position.coords.longitude}`});
        //passes in the location to start finding restaraunts
        this.getNearbyRestaurants({location:this.state.latlong});
        //getAddress will take our longitude and latitude and find the nearest address to us
        getAddress({lat:position.coords.latitude,lng:position.coords.longitude},((location)=>
          //the location state will update each time this is run

          this.setState({location: `Current Location: ${location.address.streetNumber} ${location.address.street}`})

            ))
        //this.setState({location :  [`latitude: ${position.coords.latitude}`,`longitude: ${position.coords.longitude}`]})
        })
    }
  }
  // get all the restaurants nearby
  getNearbyRestaurants(location){
    getRestaurants(location,(restaurants) => {
      this.setState({data:restaurants});
    })
  }


  //this waits till you have rendered something to then run anything in here
  componentDidMount() {
    this.getLocation()
    //this.getNearbyRestaurants({location:this.state.latlong});
  }

  //this is for displaying the list, once this function was called it will hide the button
  displayList(){
    this.setState({showList:true});
    this.setState({hideButton:true});
  }

  //this is for displaying the Direction component, this needs to be called when a restaurant has been clicked
  displayDirections(destinationLatLng) {
    var location = {origin:this.state.latlong, destination: destinationLatLng};

    getDirections(location,(steps) => {
      //get all data needed then replace the current display to a direction component
      this.setState({directions:steps});
      this.setState({showList:false});
      this.setState({showDirections:true});
    })

  }

  render() {
    //set to a variable for a little better readability
    var location = this.state.location
    //sets the data to the data variable
    var data = this.state.data
    return (
     <div className="App">

       {/*We're accepting this button's state from the root state, so we can keep our button inside of our Loading component*/}
        <Loading location={location} hideButton={this.state.hideButton} displayList={() => this.displayList()}/>
        {
          //check if showList is true then call the List component
          this.state.showList ?
          <List data={data} showDirections={this.state.showDirections} displayDirections={this.displayDirections.bind(this)}/> : null
        }

        {
          //check if showDirections is true then call the Directions component
          this.state.showDirections ?
           <Directions directions={this.state.directions}/> : null
        }

      </div>
    );
  }
}

export default App;
