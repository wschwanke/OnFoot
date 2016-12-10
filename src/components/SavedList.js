//Shows the restaurants found with the appropriate search by rendering one instance of item for each of them.
import React, { Component } from 'react';
import './css/List.css';

import SavedItem from './SavedItem';

class SavedList extends Component {
  constructor (props) {
    super(props)
    this.state = {};
  }
  render(){
    return(
      <div className='container list'>
      <div className='row list-header'>
        <h2 className='col-xs'>Your saved restaurants</h2>
      </div>
      <div className='container list-location'>
        <ul className='row'>
          {
            this.props.data.map((restaurant) =>
            <SavedItem item={restaurant} API={this.props.API} displayDirections={this.props.displayDirections}/>
            )
          }
        </ul>
      </div>
    </div>
    )
  }
}

export default SavedList;
