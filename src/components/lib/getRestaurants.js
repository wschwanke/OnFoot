import $ from 'jquery';
var getRestaurants = (options,callback) => {
  console.log("Test", options)
  //console.log("location", options.location,'Distance? ',options.distance);
  //pass in the lat/long so we can get the results for our current location
  $.get(`/fetchData/${options.location}/${options.radius}`,{

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
