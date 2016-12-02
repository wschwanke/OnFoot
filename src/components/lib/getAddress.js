var getAddress = (options,callback) => {

  $.get('http://api.geonames.org/findNearestAddressJSON',{
    lat: options.lat,
    lng: options.lng,
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