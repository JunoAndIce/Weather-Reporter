function weatherBalloon( cityID ) {
  var key = '{293f455dd8c54c0b165da1f617f1f056}';
  fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    console.log(data);
  })
  .catch(function() {
    // catch any errors
  });
}

window.onload = function() {
  weatherBalloon( 6167865 );
}