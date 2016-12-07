import $ from 'jquery';

var getMap = (location,callback) => {
  var waypoints = ''
  var shorten = location.waypoints[0]
  for (var i = 0; i < shorten.steps.length; i++) {
    waypoints+=shorten.steps[i].start_location.lat+','+shorten.steps[i].start_location.lng+'|'+shorten.steps[i].end_location.lat+','+shorten.steps[i].end_location.lng+'|';
  }
  //just make the pain go away
  var start = shorten.steps[0].start_location.lat+','+shorten.steps[0].start_location.lng
  var end = shorten.steps[shorten.steps.length-1].end_location.lat+','+shorten.steps[shorten.steps.length-1].end_location.lng
  var waypoints= waypoints.slice(0,waypoints.length-1)
  $.get(`/fetchMap/${start}/${end}/${waypoints}`)
   .done((map)=>{
     callback(map);
   })
   .fail(({responseJSON})=>{
     responseJSON.error.errors.forEach((err) =>
       console.error(err)
     );
   });
 };

export default getMap


// `https://maps.googleapis.com/maps/api/staticmap?path=-2.41535,-60.66964|64.65596,-150.00241&size=600x300&markers=-2.41535,-60.66964|64.65596,-150.00241&key=AIzaSyD7pvcevmG2qopVVnjxBDjAiUKgjuwS5IU