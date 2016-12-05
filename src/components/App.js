import React, { Component } from 'react';
import logo from '../logo.svg';
import './css/App.css';
import getRestaurants from './lib/getRestaurants.js'
import getAddress from './lib/getAddress.js'

import List from './List';
import data from './data/data.js'
import Loading from './Loading';

class App extends Component {
  constructor (props) {
    super()
    this.state = {
      //original value so that its not just undefined
      location: `Getting your location...`,
      latlong:undefined,
      data:undefined, 
      showList: false,
      hideButton: false
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
  render() {
    //set to a variable for a little better readability
    var location = this.state.location
    //sets the data to the data variable
    var data = this.state.data
    return (
     <div className="App">

        <Loading location={location} hideButton={this.state.hideButton} displayList={() => this.displayList()}/>
        
        {
          //check if showList is true then call the List component 
          this.state.showList ?
           <List data={data} /> : null
        }

      </div>
    );
  }
}

export default App;
