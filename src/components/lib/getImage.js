import $ from 'jquery';


  $.get('/fetchRestaurantImage')
  .done((items) => {
      callback(JSON.parse(items));
  })
  .fail(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
};

export default getImage;