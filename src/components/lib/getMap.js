import $ from 'jquery';

var getMap = (location,callback) => {
  var waypoints = ''
  for (var i = 0; i < location.waypoints[0].steps.length; i++) {
    waypoints+=location.waypoints[0].steps[i].end_location.lat+','+location.waypoints[0].steps[i].end_location.lng+'|';
  }
  var start = location.waypoints[0].start_address
  var end = location.waypoints[0].end_address
  console.log('we\'re going from', start,' to ',end)
  var waypoints= waypoints.slice(0,waypoints.length-1)
  console.log('please work',waypoints)
//   $.get(`/map/${location.origin}/${location.destination}`)
//   .done((directions)=>{
//     callback(JSON.parse(directions));
//   })
//   .fail(({responseJSON})=>{
//     responseJSON.error.errors.forEach((err) =>
//       console.error(err)
//     );
//   });
 };

export default getMap


// `https://maps.googleapis.com/maps/api/staticmap?path=-2.41535,-60.66964|64.65596,-150.00241&size=600x300&markers=-2.41535,-60.66964|64.65596,-150.00241&key=AIzaSyD7pvcevmG2qopVVnjxBDjAiUKgjuwS5IU