//                          App
//  -------------------------|--------------------------
//  |                        |          |            |
//  |                        |          |           Map
//  List                  Loading     Nav     SaveRestaurants 
//  |                                   |       (Ordered list of results in <li>)          
//Filter/Map                          Login
// Item                                 |
//                                   /login

//Tech Stack Documentation
// For navigator.geolocation and such
// http://www.w3schools.com/html/html5_geolocation.asp
// For google maps api search:
// https://developers.google.com/places/web-service/search
//

//Standard imports
import React, { Component } from 'react';
import logo from '../logo.svg';
import './css/App.css';

//Import lib helper functions.
import getRestaurants from './lib/getRestaurants.js'
import getAddress from './lib/getAddress.js'
import getDirections from './lib/getDirections.js'
import getAPI from './lib/getImagesAPI.js'
import isLogin from './lib/isLogin.js'
import getDisplayName from './lib/getDisplayName.js'
import getSaveRestaurant from './lib/getSaveRestaurant.js'
import getLatLong from './lib/getLatLong.js'


//New Libs for Team Troll
import getRestaurantsWithVariableDistance from './lib/getRestaurantsWithVariableDistance';

//Import called components
import List from './List';
import SavedList from './SavedList';
import Loading from './Loading';
import Nav from './Nav';
import SaveRestaurants from './SaveRestaurants';



class App extends Component {
  constructor (props) {
    super()
    this.state = {
      //original value so that its not just undefined
      location: null,
      latlong: undefined,
      objLatLng: {
        lat: null,
        lng: null
      },
      data: undefined,
      savedRestaurantData:undefined,
      showList: false,
      hideButton: false,
      directions: undefined,
      imageAPI: undefined,
      isLogin: false,
      displayName: undefined,
      showSaveRestaurants: false,
      radius: 1750,
      dollars: 1,
      locEnabled: true,
      manualAddress: ''
    };

    // Get latitude and longitude from an address
    this.getLatLong = _.debounce((options, callback) => {
      getLatLong(options, callback);
    }, 1000);
    this.handleRadiusFilterSliderEvent = this.handleRadiusFilterSliderEvent.bind(this);
    this.handlePriceFilterSliderEvent = this.handlePriceFilterSliderEvent.bind(this);
  }

  handleManualAddressInput(e) {
    this.setState({manualAddress: e.target.value});
    let options = {
      address: this.state.manualAddress
    }
    this.getLatLong(options, (res) => {
      this.setState({objLatLng: {lat: res.lat, lng: res.lng}})
      this.setState({latlong: `${res.lat},${res.lng}`}, () => {
        this.getNearbyRestaurants({location:this.state.latlong,radius:this.state.radius});
      });
    });
  }

  handleRadiusFilterSliderEvent(e) {
    this.setState({radius: e.target.value});
  }

  handlePriceFilterSliderEvent(e) {
    this.setState({dollars: e.target.value})
  }

  getLocation() {
    // Get the user's location:
    if (navigator.geolocation) {
      //use an arrow function to not lose  this binding
      //watchPosition will constantly get the user's location
      navigator.geolocation.watchPosition( (position) => {
       // console.log("Success! latitude: ", position.coords.latitude, "longitude:", position.coords.longitude)
        this.setState({latlong:`${position.coords.latitude},${position.coords.longitude}`});
        this.setState({objLatLng: {lat: position.coords.latitude, lng: position.coords.longitude}})
        //this.setState({objLatLng: {lat: position.coords.latitude, lng: position.coords.longitude}});
        //passes in the location to start finding restaraunts
        //getAddress will take our longitude and latitude and find the nearest address to us
        getAddress({latlng:this.state.latlong},((location)=>{
          //console.log(location)
          //the location state will update each time this is run
          //split data into variables to increase readability
          var streetNum  = location[0].long_name
          var streetName = location[1].long_name
          //the location state will update each time this is run
          this.setState({location: `${streetNum} ${streetName}`});
        }))
      }, (err) => {
        if (err.code == err.PERMISSION_DENIED) {
          this.setState({locEnabled: false});
        }
      })
    }
  }

  // get all the restaurants nearby
  //container function for lib/getRestaurants.js
    // ^^ === sends lat/long to /fetchData endpoint via jQuery
      // ^^ Google api call is in server.js
    //Modified to accept variable distance.  
  getNearbyRestaurants(options, callback){
    getRestaurants(options,(restaurants) => {
      this.setState({data:restaurants});
    })
  }
   

//Container function for lib/getSaveRestaurants and updates state.
  //^^ === GET request to /checkList endpoint.
    // ^^ === retrieves 'user' from DB.  
      // ^^ === user has saved restaurant IDs
         //  Schema:
         // id : Number,
         // name : String,
         // checkList : [ {placeId: String, place:String} ]
  getSavedRestaurants(){
    getSaveRestaurant((restaurants)=>{
      console.log("res",restaurants);
      //if(this.state.savedRestaurantsData === undefined){
        this.setState({savedRestaurantData: restaurants})
     // }
      this.setState({showSaveRestaurants: true});
    })
  }

//Updates state to not show save restaurants.
  hidSaveRestaurants(){
    this.setState({showSaveRestaurants: false});
  }


  componentDidMount() {
   // calls getAPI and returns the environment variable API or deployment config API and
   // sets state to that so we can pass it down
   // getAPI from lib/getImagesAPI
     // ^ = GET request to fetchAPI endpoint.
       // ^ = returns (process.env.imageKey || credentials.imageKey)
    getAPI((api)=>{
      this.setState({imageAPI:api})

    })

    this.getLocation();
// from lib/isLogin
  // ^ =  GET request to isLogin
    // ^ = checks for user in DB and returns data if found.
    isLogin((user)=>{
      this.setState({isLogin:user.isLogin});
      this.setState({displayName:user.name});
    })
  }



  //Will show the list of restaurants and hide the find restaurants button.
  displayList(){
    this.getNearbyRestaurants({location:this.state.latlong, radius:this.state.radius});
    this.setState({showList:true});
    this.setState({hideButton:false});
  }

  //this is for displaying the List/Item components
    // Gets and displays the text directions.
  displayDirections(destinationLatLng, id, e) {
    var location = {origin:this.state.latlong, destination: destinationLatLng};
    // getDirections from lib/getDirections
    //^ = GET to /directions/ endpoint
    //^ = Google maps API call for directions.
    getDirections(location,(steps) => {
      //get all data needed then replace the current display to a direction component
      this.setState({directions:steps});
      // this.setState({showList:false});
      // this.setState({showDirections:true});

      // we get an array with the results back from the Google API; that's what we're accessing
      var data=this.state.data.results;

      // Take a deep breath...
      // get the directions out of the JSON object and onto the page
      var directionSteps = steps.routes[0].legs[0].steps
        // map over the array we get back for the html_instructions, and then
        // strip out the html tags that the Google Maps directions object returns
        .map(x=>x.html_instructions.replace(/<(?:.|\n)*?>/gm, ' '))


      // look up the item in our state by state.id and
      // set a directions property equal to the "steps" from Google's directions
      // (with quadratic time complexity :) )
      data[data.map(x => x.id).indexOf(id)]['directions'] = directionSteps;

      // In order to get the directions to display in each "card", we had to use forceUpdate.
      // There's probably a better way to handle this...
      this.forceUpdate();
      //ÏHere are the steps results for the place you just clicked', steps);
    })
  }

  getOutOfSavedList(){
    //this.setState({showList:true})
    this.setState({showSaveRestaurants:false})
  }

  renderWhichList(){
    if(this.state.showList===false){
      return null;
    }else{
      if(this.state.showSaveRestaurants===false){
        return (
          <List
            dollars={this.state.dollars}
            radius={this.state.radius}
            data={this.state.data}
            API={this.state.imageAPI}
            isLogin={this.state.isLogin}
            showSaveRestaurants={this.state.showSaveRestaurants}
            displayDirections={this.displayDirections.bind(this)}
            objLatLng={this.state.objLatLng}
          />
        )
      } else {
        return <SavedList data={this.state.savedRestaurantData} API={this.state.imageAPI} displayDirections={this.displayDirections.bind(this)}/> 
      }
    }
  }

  render() {
    //set to a variable for a little better readability
    var location = this.state.location;
    var data = this.state.data;
    var api = this.state.imageAPI;
    var isLogin = this.state.isLogin;

    return (
      <main className='container'>
        {  //Nav shows login/logout and saved restaurants.
          <Nav
            getOutOfSavedList={this.getOutOfSavedList.bind(this)}
            getSavedRestaurants={this.getSavedRestaurants.bind(this)}
            showSaveRestaurants={this.state.showSaveRestaurants}
            isLogin={this.state.isLogin}
            displayName={this.state.displayName
          }/>
        }
        {/*We're accepting this button's state from the root state, so we can keep our button inside of our Loading component*/
         //Functional component to show logo, name and location.  Also has button to trigger App
          <Loading
            showSaveRestaurants={this.state.showSaveRestaurants}
            isLogin={this.state.isLogin}
            location={this.state.location}
            hideButton={this.state.hideButton}
            displayList={() => this.displayList()}
            locEnabled={this.state.locEnabled}
            manualAddress={this.state.manualAddress}
            handleManualAddressInput={this.handleManualAddressInput.bind(this)}
            radius={this.state.radius}
            dollars={this.state.dollars}
            handleRadiusFilter={this.handleRadiusFilterSliderEvent}
            handlePriceFilter={this.handlePriceFilterSliderEvent}
          />
        }
        {
          this.state.showSaveRestaurants ?
            <SavedList data={this.state.savedRestaurantData} API={this.state.imageAPI} displayDirections={this.displayDirections.bind(this)}/> : null
        }
        {
          this.state.showList ?
          <List
            dollars={this.state.dollars}
            radius={this.state.radius}
            data={this.state.data}
            API={this.state.imageAPI}
            isLogin={this.state.isLogin}
            showSaveRestaurants={this.state.showSaveRestaurants}
            displayDirections={this.displayDirections.bind(this)}
            objLatLng={this.state.objLatLng}
          /> : null
        }
      </main>
    )
  }
}

export default App;
