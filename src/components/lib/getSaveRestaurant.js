import React from 'react'

var getSaveRestaurant = (callback) => {
  $.get('/checkList')
  .done((restaurants)=>{
    console.log("users",restaurants.checkList);
    callback(restaurants.checkList);
  })
  .fail(({responseJSON})=>{
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
}

export default getSaveRestaurant;
