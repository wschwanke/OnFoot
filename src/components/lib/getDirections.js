import $ from 'jquery';

var getDirections = (location,callback) => {
  console.log("This is your current location: ", location);
  $.get(`/directions/${location.origin}/${location.destination}`)
    .done((directions)=>{
      callback(JSON.parse(directions));
    })
    .fail(({responseJSON})=>{
      responseJSON.error.errors.forEach((err) =>
        console.error(err)
      );
    });
};

export default getDirections
