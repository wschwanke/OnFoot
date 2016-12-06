import $ from 'jquery'; 
var getAddress = (options,callback) => {
//sends off an api request with options we pass in, this gets the closest address to our lat & long
  $.get('http://api.geonames.org/findNearestAddressJSON',{
    lat: options.lat,
    lng: options.lng,
    //the username is required to use this api call
    username: 'onFoot'
  })
  .done((items) => {
      callback(items);
  })
  .fail(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
};

export default getAddress;