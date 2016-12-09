import $ from 'jquery';
var getRestaurants = (options,callback) => {
  console.log("location", options.location);
  //pass in the lat/long so we can get the results for our current location
  $.get(`/variableDistanceSearch/${options.location}/${options.distance}`,{

  })
  .done((items) => {
      callback(JSON.parse(items));
  })
  .fail(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
};

export default getRestaurants;