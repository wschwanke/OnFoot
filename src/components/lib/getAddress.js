import $ from 'jquery'; 
var getAddress = (options,callback) => {
//sends off an api request with options we pass in, this gets the closest address to our lat & long
  $.get(`/fetchAddress/${options.latlng}`)
  .done((items) => {
    items = JSON.parse(items)
    //filtering it down so we just get what we need
      callback(items.results[0].address_components);
  })
  .fail(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
};

export default getAddress;