


var searchBtn = document.querySelector(".search-btn");
var pastSearch = document.querySelector(".past-search")
var searchValue = document.querySelector("#search-bar");
var tempVal = document.querySelector(".temp");
var windVal = document.querySelector(".wind");
var humidVal = document.querySelector(".humid");

const locVal = document.getElementById("location");
const dateVal = document.getElementById("date");
const weaVal = document.getElementById("weather");
const weatherIcon = document.getElementById("icon");
const btnCtn = document.querySelector('.btn-container');

var key = '5a2f98c3ec37f50410b5783b70b8d363'

var locationData = [];
var weatherInformation = [];

function dataInit(data){
  
    var name = locationData[0].name;
    var lat = locationData[0].lat;
    var long = locationData[0].lon;

    

    getWeather(name,lat,long);
}

searchBtn.addEventListener('click', function() {

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchValue.value}&limit=5&appid=${key}`)

  .then(function(response) { 
    return response.json();
  })
  
  .then(function(data) {
    console.log(data)
    dataInit(data);

    var input = document.createElement("input");
    input.type = 'button';
    input.value = searchValue.value;
    input.className = 'past-search';
    btnCtn.appendChild(input);

  });
})

pastSearch.addEventListener('click', function() {

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${pastSearch.value}&limit=5&appid=${key}`)

  .then(function(response) {
    return response.json();
  })
  
  .then(function(data) {
    console.log(data)
    dataInit(data);
  });
})

function lightText(titles) {
  titles.classList.remove('linfo');
  titles.classList.add('has-text-light');
  
}



function getWeather(name,lat,long) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`)
  .then(function(weather) {
    return weather.json();
  }) 
  .then(function(weatherData){
    // TODO: MOVE INTO A FUNCTION 
    weatherInformation = weatherData;
    console.log(weatherInformation)
    tempVal.innerHTML = weatherInformation.main.temp + "&#8451";
    locVal.innerHTML = weatherInformation.name + ', ' + weatherInformation.sys.country;
    // dateVal;
    weaVal.innerHTML = weatherInformation.weather[0].main;
    // + "... " + weatherInformation.weather[0].description;
    lightText(locVal);
    lightText(weaVal);
    lightText(dateVal);
    weatherIcon.src = 'https://openweathermap.org/img/wn/' + weatherInformation.weather[0].icon + '@2x.png' ;
    ;
  }) 
}
  



// searchBtn.addEventListener('click', () => {
//   fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
//   .then(function(resp) { return resp.json() }) // Convert data to json
//   .then(function(data) {
//     console.log(data);
//   })
//   .catch(function() {
//     // catch any errors
//   });
// }) 
  


// window.onload = function() {
//   weatherBalloon( 6167865 );
// }

// $()

// TODO: GET VALUE FROM SEARCH BAR
// TODO: PASS VALUE TO WEATHER
// TODO: CHANGE HTML VALUE/DATA WITH DATA PULLED FROM API
// TODO: REMEMBER LAST SEARCH AND CREATE A BUTTON IN PAST SEARCHES
// TODO: GIVE BUTTON VALUE TO CHANGE DATA TO THAT CITY
// TODO: **EXTRA** MOVE BUTTON TO THE TOP OF LIST
