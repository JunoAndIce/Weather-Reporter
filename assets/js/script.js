
// import dayjs from 'dayjs'
// import utc from 'dayjs/plugin/utc'
// import tz from 'dayjs/plugin/timezone'

dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_timezone)    

var searchBtn = document.querySelector(".search-btn");
// var pastSearch = document.querySelectorAll(".past-search");
var searchValue = document.querySelector("#search-bar");
var tempVal = document.querySelector(".temp");
var windVal = document.querySelector(".wind");
var humidVal = document.querySelector(".humid");

const locVal = document.getElementById("location");
const dateVal = document.getElementById("date");
const weaVal = document.getElementById("weather");
const weatherIcon = document.getElementById("icon");
const btnCtn = document.querySelector('.btn-container');

// DayJS Stuff 
var reformatDate = dayjs().format('dddd, MMMM D YYYY, h:mm:ss a');
var timeZone = '';

var key = '5a2f98c3ec37f50410b5783b70b8d363'

var locationData = [];
var weatherInformation = [];

searchBtn.addEventListener('click', function() {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchValue.value}&limit=5&appid=${key}`)

  .then(function(response) { 
    return response.json();
  })
  
  .then(function(data) {
    console.log(data)
    locationData = data;
    

    dataInit(locationData);
    createButton(searchValue);
  });
})

// This is where the weather for the current day is pulled.
function getWeather(name,lat,long,date) {
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
    dateVal.innerHTML = date;
    weaVal.innerHTML = weatherInformation.weather[0].main;
    // + "... " + weatherInformation.weather[0].description;
    lightText(locVal);
    lightText(weaVal);
    lightText(dateVal);
    weatherIcon.src = 'https://openweathermap.org/img/wn/' + weatherInformation.weather[0].icon + '@2x.png' ;
    ;
  }) 
}
  


// Get data from the array and pass it into the Getweather function.
function dataInit(data){
  var name = data[0].name;
  var state = data[0].state;
  var lat = data[0].lat;
  var long = data[0].lon;
  timeZone = data[0].country;

  var date = dayjs.utc(reformatDate).tz(timeZone).local().toDate();

  // API NINJAS TIMEZONE APPLIED
  var city = 'london'
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/timezone?city=' + city,
    headers: { 'X-Api-Key': '5+fMkk9J6kNWsJlswZRt+w==9jRrN5PiMfoWfMd2'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});
  getWeather(name, lat, long, date);
}



function createButton(search){
  var newInput = document.createElement("input");

  newInput.type = 'button';
  newInput.value = search.value.toUpperCase();
  newInput.className = 'past-search';
  newInput.onclick = function() {pastSearch(newInput.value)};

  btnCtn.appendChild(newInput);
  
}

function pastSearch(search) {

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${key}`)

  .then(function(response) {
    return response.json();
  })
  
  .then(function(data) {
    console.log(data)
    locationData = data;

    dataInit(locationData);
  });
}


function lightText(titles) {
  titles.classList.remove('linfo');
  titles.classList.add('has-text-light');
  
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
