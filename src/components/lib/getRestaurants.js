var getRestaurants = (callback) => {

  $.get('/fetchData')
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
