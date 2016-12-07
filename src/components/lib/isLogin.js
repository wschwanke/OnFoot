import $ from 'jquery';

var isLogin = (callback) => {

  //pass in the lat/long so we can get the results for our current location
  $.get('/isLogin')
  .done((data) => {
    console.log("data",data);
      callback(data);
  })
  .fail(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
};

export default isLogin;
