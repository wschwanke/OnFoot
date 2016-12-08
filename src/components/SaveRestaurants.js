//Functional component to show and hide the saved Restaurants.

import React from 'react'

const SaveRestaurants = ({data, hidSaveRestaurants}) => {
  return(
    <div className='save-restaurant'>
    <p onClick = {hidSaveRestaurants}>X</p>
    <h2>Save Restaraunts</h2>
      <ul>
      {
        data.map((data)=> <li>{data.place}</li>)
      }
      </ul>
    </div>
  )
}

export default SaveRestaurants;
