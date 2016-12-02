'use strict';

window.onload = function () {
  // check for Geolocation support
  if (navigator.geolocation) {
    console.log('Geolocation is supported!');
  } else {
    console.log('Geolocation is not supported for this Browser/OS.');
  }
  // Get the user's location:
  var geoSuccess = function geoSuccess(position) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        $("#coordinates").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
      });
    }
  };
  //this is testing area
  var geoError = function geoError(error) {
    console.log('Uh oh. Error: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

  // for fetching google api - refactore the logic for react
  var fetch = function fetch() {
    $.ajax({
      type: "GET",
      url: "http://localhost:4040/fetchData"
    }).done(function (data) {
      var filteredData = [];
      var fetchData = JSON.parse(data).results.filter(function (el) {
        return el.rating >= 4 && el.price_level <= 2;
      });
      console.log("fetch", fetchData); //delete this after you render
      fetchData.forEach(function (el) {

        //render html stuff here;
      });
    });
  };

  $('#foodbtn').on('click', function (event) {
    event.preventDefault();
    fetch();
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL21haW4uanMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJjb25zb2xlIiwibG9nIiwiZ2VvU3VjY2VzcyIsInBvc2l0aW9uIiwiZ2V0Q3VycmVudFBvc2l0aW9uIiwiJCIsImh0bWwiLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImdlb0Vycm9yIiwiZXJyb3IiLCJjb2RlIiwiZmV0Y2giLCJhamF4IiwidHlwZSIsInVybCIsImRvbmUiLCJkYXRhIiwiZmlsdGVyZWREYXRhIiwiZmV0Y2hEYXRhIiwiSlNPTiIsInBhcnNlIiwicmVzdWx0cyIsImZpbHRlciIsImVsIiwicmF0aW5nIiwicHJpY2VfbGV2ZWwiLCJmb3JFYWNoIiwib24iLCJldmVudCIsInByZXZlbnREZWZhdWx0Il0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPQyxNQUFQLEdBQWdCLFlBQVc7QUFDM0I7QUFDRSxNQUFJQyxVQUFVQyxXQUFkLEVBQTJCO0FBQzNCQyxZQUFRQyxHQUFSLENBQVksMkJBQVo7QUFDQyxHQUZELE1BR0s7QUFDSEQsWUFBUUMsR0FBUixDQUFZLG1EQUFaO0FBQ0Q7QUFDSDtBQUNFLE1BQUlDLGFBQWEsU0FBYkEsVUFBYSxDQUFTQyxRQUFULEVBQW1CO0FBQ2xDLFFBQUlMLFVBQVVDLFdBQWQsRUFBMkI7QUFDM0JELGdCQUFVQyxXQUFWLENBQXNCSyxrQkFBdEIsQ0FBeUMsVUFBU0QsUUFBVCxFQUFtQjtBQUMxREUsVUFBRSxjQUFGLEVBQWtCQyxJQUFsQixDQUF1QixlQUFlSCxTQUFTSSxNQUFULENBQWdCQyxRQUEvQixHQUEwQyxpQkFBMUMsR0FBOERMLFNBQVNJLE1BQVQsQ0FBZ0JFLFNBQXJHO0FBQ0EsT0FGRjtBQUdDO0FBQ0YsR0FORDtBQU9GO0FBQ0UsTUFBSUMsV0FBVyxTQUFYQSxRQUFXLENBQVNDLEtBQVQsRUFBZ0I7QUFDM0JYLFlBQVFDLEdBQVIsQ0FBWSxtQkFBbUJVLE1BQU1DLElBQXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILEdBUEQ7QUFRRWQsWUFBVUMsV0FBVixDQUFzQkssa0JBQXRCLENBQXlDRixVQUF6QyxFQUFxRFEsUUFBckQ7O0FBRUo7QUFDRSxNQUFJRyxRQUFRLFNBQVJBLEtBQVEsR0FBVTtBQUNwQlIsTUFBRVMsSUFBRixDQUFPO0FBQ1BDLFlBQU0sS0FEQztBQUVQQyxXQUFLO0FBRkUsS0FBUCxFQUdHQyxJQUhILENBR1EsVUFBVUMsSUFBVixFQUFnQjtBQUNwQixVQUFJQyxlQUFlLEVBQW5CO0FBQ0EsVUFBSUMsWUFBYUMsS0FBS0MsS0FBTCxDQUFXSixJQUFYLENBQUQsQ0FBbUJLLE9BQW5CLENBQTJCQyxNQUEzQixDQUFrQztBQUFBLGVBQUlDLEdBQUdDLE1BQUgsSUFBWSxDQUFaLElBQWVELEdBQUdFLFdBQUgsSUFBaUIsQ0FBcEM7QUFBQSxPQUFsQyxDQUFoQjtBQUNBM0IsY0FBUUMsR0FBUixDQUFZLE9BQVosRUFBb0JtQixTQUFwQixFQUhvQixDQUdVO0FBQzlCQSxnQkFBVVEsT0FBVixDQUFrQixVQUFTSCxFQUFULEVBQVk7O0FBRTVCO0FBQ0QsT0FIRDtBQUlILEtBWEQ7QUFZRCxHQWJEOztBQWVBcEIsSUFBRSxVQUFGLEVBQWN3QixFQUFkLENBQWlCLE9BQWpCLEVBQTBCLFVBQVVDLEtBQVYsRUFBZ0I7QUFDeENBLFVBQU1DLGNBQU47QUFDQWxCO0FBQ0QsR0FIRDtBQUtELENBaEREIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4vLyBjaGVjayBmb3IgR2VvbG9jYXRpb24gc3VwcG9ydFxuICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gIGNvbnNvbGUubG9nKCdHZW9sb2NhdGlvbiBpcyBzdXBwb3J0ZWQhJyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ0dlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHRoaXMgQnJvd3Nlci9PUy4nKTtcbiAgfVxuLy8gR2V0IHRoZSB1c2VyJ3MgbG9jYXRpb246XG4gIHZhciBnZW9TdWNjZXNzID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihwb3NpdGlvbikge1xuICAgICAgJChcIiNjb29yZGluYXRlc1wiKS5odG1sKFwibGF0aXR1ZGU6IFwiICsgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCI8YnI+bG9uZ2l0dWRlOiBcIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xuICAgICB9KTtcbiAgICB9XG4gIH1cbi8vdGhpcyBpcyB0ZXN0aW5nIGFyZWFcbiAgdmFyIGdlb0Vycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdVaCBvaC4gRXJyb3I6ICcgKyBlcnJvci5jb2RlKTtcbiAgICAgIC8vIGVycm9yLmNvZGUgY2FuIGJlOlxuICAgICAgLy8gICAwOiB1bmtub3duIGVycm9yXG4gICAgICAvLyAgIDE6IHBlcm1pc3Npb24gZGVuaWVkXG4gICAgICAvLyAgIDI6IHBvc2l0aW9uIHVuYXZhaWxhYmxlIChlcnJvciByZXNwb25zZSBmcm9tIGxvY2F0aW9uIHByb3ZpZGVyKVxuICAgICAgLy8gICAzOiB0aW1lZCBvdXRcbiAgfTtcbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGdlb1N1Y2Nlc3MsIGdlb0Vycm9yKTtcblxuLy8gZm9yIGZldGNoaW5nIGdvb2dsZSBhcGkgLSByZWZhY3RvcmUgdGhlIGxvZ2ljIGZvciByZWFjdFxuICB2YXIgZmV0Y2ggPSBmdW5jdGlvbigpe1xuICAgICQuYWpheCh7XG4gICAgdHlwZTogXCJHRVRcIixcbiAgICB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDo0MDQwL2ZldGNoRGF0YVwiLFxuICAgIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIGZpbHRlcmVkRGF0YSA9IFtdO1xuICAgICAgICB2YXIgZmV0Y2hEYXRhID0gKEpTT04ucGFyc2UoZGF0YSkpLnJlc3VsdHMuZmlsdGVyKGVsPT5lbC5yYXRpbmcgPj00JiZlbC5wcmljZV9sZXZlbCA8PTIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImZldGNoXCIsZmV0Y2hEYXRhKS8vZGVsZXRlIHRoaXMgYWZ0ZXIgeW91IHJlbmRlclxuICAgICAgICBmZXRjaERhdGEuZm9yRWFjaChmdW5jdGlvbihlbCl7XG5cbiAgICAgICAgICAvL3JlbmRlciBodG1sIHN0dWZmIGhlcmU7XG4gICAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICAkKCcjZm9vZGJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBmZXRjaCgpO1xuICB9KTtcblxufVxuIl19