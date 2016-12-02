var getRestaurants = (options,callback) => {
  $.ajax({
    type: 'GET',
    url: 'http:localhost:4040/fetchData',
    content-type: 'application/json',
    success:function(data){
      var nearByRestaurants = (JSON.parse(data)).results.filter(el=>el.rating >=4&&el.price_level <=2);
      callback(nearByRestaurants);
    },
    error: function(err){
      console.log("Error": err);
    }
  });
};

window.getRestaurants = getRestaurants;
