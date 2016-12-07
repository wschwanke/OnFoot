import $ from 'jquery';

var getMap = (location,callback) => {
  var waypoints = ''
  //increase readability
  var shorten = location.waypoints[0]
  //add every waypoint to a string
  for (var i = 0; i < shorten.steps.length; i++) {
    waypoints+=shorten.steps[i].start_location.lat+','+shorten.steps[i].start_location.lng+'|'+shorten.steps[i].end_location.lat+','+shorten.steps[i].end_location.lng+'|';
  }
  //just make the pain go away
  var start = shorten.steps[0].start_location.lat+','+shorten.steps[0].start_location.lng
  //"shortening" it to increase readability
  var end = shorten.steps[shorten.steps.length-1].end_location.lat+','+shorten.steps[shorten.steps.length-1].end_location.lng
  //slicing off the end to get rid of the last "|"
  var waypoints= waypoints.slice(0,waypoints.length-1)
  //use a get request to build our url server side, and hide our API key
  $.get(`/fetchMap/${start}/${end}/${waypoints}`)
   .done((map)=>{
    //send back our url
     callback(map);
   })
   .fail(({responseJSON})=>{
     responseJSON.error.errors.forEach((err) =>
       console.error(err)
     );
   });
 };

export default getMap
