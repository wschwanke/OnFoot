import $ from 'jquery';

var getDirections = (location,callback) => {
  console.log("location get", location);
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
