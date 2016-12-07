import $ from 'jquery'; 
var getImageAPI = (callback) => {
  $.get(`/fetchAPI`)
  .done((API) => {
      callback(API);
  })
  .fail(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
};

export default getImageAPI;