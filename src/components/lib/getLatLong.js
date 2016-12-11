import $ from 'jquery'; 
var getLatLong = (options,callback) => {
  console.log(options)
//sends off an api request with options we pass in, this gets the closest address to our lat & long
  $.get(`/fetchLatLong/${options.address}`)
  .done((items) => {
    // console.log(items)
    items = JSON.parse(items)
    //filtering it down so we just get what we need
      callback(items.results[0].geometry.location);
  })
  .fail(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
};

export default getLatLong;