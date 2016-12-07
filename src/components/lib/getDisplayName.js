import $ from 'jquery'

var getDisplayName = (callback) => {
  $.get('/getDisplayName')
   .done(name =>{
     console.log(name);
     callback(name)
   })
   .fail(({responseJSON}) => {
     responseJSON.error.errors.forEach((err) =>
       console.error(err)
     );
   });
}

export default getDisplayName;
