window.onload = function() {
// check for Geolocation support
  if (navigator.geolocation) {
  console.log('Geolocation is supported!');
  }
  else {
    console.log('Geolocation is not supported for this Browser/OS.');
  }
// Get the user's location:
  var geoSuccess = function(position) {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $("#coordinates").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
     });
    }
  }
//this is testing area
  var geoError = function(error) {
      console.log('Uh oh. Error: ' + error.code);
      // error.code can be:
      //   0: unknown error
      //   1: permission denied
      //   2: position unavailable (error response from location provider)
      //   3: timed out
  };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

// for fetching google api - refactor the logic for react
  var fetch = function(){
    $.ajax({
    type: "GET",
    url: "http://localhost:4040/fetchData",
    }).done(function (data) {
        var filteredData = [];
        var fetchData = (JSON.parse(data)).results.filter(el=>el.rating >=4&&el.price_level <=2);
        console.log("fetch",fetchData)//delete this after you render
        fetchData.forEach(function(el){

          //render html stuff here;
        })
    });
  }

  $('#foodbtn').on('click', function (event){
    event.preventDefault();
    fetch();
  });

}
