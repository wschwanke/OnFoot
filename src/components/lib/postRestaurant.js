import $ from 'jquery'

var postRestaurant = (id,name)=>{
  $.post(`/checkList/${id}/${name}`)
  .done(function(data){
    console.log('save..');
  })
}

export default postRestaurant;
