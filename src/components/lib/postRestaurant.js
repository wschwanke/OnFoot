import $ from 'jquery'

var postRestaurant = (place_id,name,rating,price_level,vicinity, geometry)=>{
	var data = {place_id:place_id, name:name, rating:rating, price_level:price_level, vicinity:vicinity, geometry:geometry}
	$.ajax({
	  type: "POST",
	  url: '/saveRestaurant',
	  data: JSON.stringify(data),
	  //success: success,
	  contentType: 'application/json'
	});
}

export default postRestaurant;
