
dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_timezone)    

// Current Weather Values 
const locVal = document.getElementById("location");
const dateVal = document.getElementById("date");
const weaVal = document.getElementById("weather");
const weatherIcon = document.getElementById("weather-icon ");
const tempVal = document.getElementById("temp");
const maxTempVal = document.getElementById("maxTemp");
const minTempVal = document.getElementById("minTemp");
const feelVal = document.getElementById("feels");
const humidVal = document.getElementById("humid");
const degVal = document.getElementById("deg");
const spdVal = document.getElementById("spd");

const btnCtn = document.querySelector('.btn-container');
const searchBtn = document.querySelector(".search-btn");
const clearBtn = document.querySelector(".clear-btn");
const searchValue = document.querySelector("#search-bar");


// FORECAST SECTION 
// DAY 1
const day1Weather = document.getElementById("day1-weather");
const day1Date = document.getElementById("day1-date");
const day1Icon = document.getElementById("day1-icon");
const day1Temp = document.getElementById("day1-temp");
const day1WindSpd = document.getElementById("day1-windSpd");
const day1Humid = document.getElementById("day1-humid");

// DAY 2
const day2Weather = document.getElementById("day2-weather");
const day2Date = document.getElementById("day2-date");
const day2Icon = document.getElementById("day2-icon");
const day2Temp = document.getElementById("day2-temp");
const day2WindSpd = document.getElementById("day2-windSpd");
const day2Humid = document.getElementById("day2-humid");

// DAY 3
const day3Weather = document.getElementById("day3-weather");
const day3Date = document.getElementById("day3-date");
const day3Icon = document.getElementById("day3-icon");
const day3Temp = document.getElementById("day3-temp");
const day3WindSpd = document.getElementById("day3-windSpd");
const day3Humid = document.getElementById("day3-humid");

// DAY 4
const day4Weather = document.getElementById("day4-weather");
const day4Date = document.getElementById("day4-date");
const day4Icon = document.getElementById("day4-icon");
const day4Temp = document.getElementById("day4-temp");
const day4WindSpd = document.getElementById("day4-windSpd");
const day4Humid = document.getElementById("day4-humid");

// DAY 5
const day5Weather = document.getElementById("day5-weather");
const day5Date = document.getElementById("day5-date");
const day5Icon = document.getElementById("day5-icon");
const day5Temp = document.getElementById("day5-temp");
const day5WindSpd = document.getElementById("day5-windSpd");
const day5Humid = document.getElementById("day5-humid");

// DayJS Vars
var reformatDate = dayjs().format('dddd, MMMM D YYYY, h:mm:ss a');
var timeZone = '';

var key = '5a2f98c3ec37f50410b5783b70b8d363'

var weatherInfo = [];
var weatherObj = {
  name: '',
  state: '',
  lat: '',
  long: '',
  country: '',
}

// INITIAL SEARCH BUTTON. 
searchBtn.addEventListener('click', function(e) {
  e.preventDefault();
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchValue.value}&limit=1&appid=${key}`)

  .then(function(response) { 
    return response.json();
  })
  
  .then(function(data) {
    // console.log(data)
    

    dataInit(data);
  })

  .catch(err => alert("Please search for a city!"));

  
})

createButton();
// CREATES BUTTON 
function createButton() {
  Object.keys(localStorage).forEach((key) => {

    // console.log(key);
    var newInput = document.createElement("input");
    newInput.type = 'button';
    newInput.value = key;
    newInput.className = 'past-search';
    btnCtn.appendChild(newInput);

    newInput.onclick = function () { pastSearch(newInput.value) };
  });
}

// Past search functions 
function pastSearch(s) {

  // Make buttons uppercase 
  const sCap = 
    s.charAt(0).toUpperCase() + s.slice(1); 

  weatherObj = JSON.parse(localStorage.getItem(sCap));


  getTime(weatherObj);
  getWeather(weatherObj);
  get5Weather(weatherObj);
}

clearBtn.addEventListener('click', function(){
  localStorage.clear();
})

// DATA INIT SECTION 
// Get data from the array and pass it into the Getweather function.
function dataInit(data){
  
  weatherObj.name = data[0].name;
  weatherObj.state = data[0].state;
  weatherObj.lat = data[0].lat;
  weatherObj.long = data[0].lon;
  weatherObj.country = data[0].country;

  weatherInfo.push(weatherObj);
  localStorage.setItem(weatherObj.name , JSON.stringify(weatherObj));

  getTime(weatherObj);
  getWeather(weatherObj);
  get5Weather(weatherObj);
  
}

function getTime ({name, country}){
  // API NINJAS TIMEZONE APPLIED
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/timezone?city=' + name + '&country=' + country,
    headers: { 'X-Api-Key': '5+fMkk9J6kNWsJlswZRt+w==9jRrN5PiMfoWfMd2' },
    contentType: 'application/json',
    success: function (result) {
      // console.log(result);
      // console.log(result.timezone);

      var date = dayjs.utc(reformatDate).tz(result.timezone).format();
      
      dateVal.innerHTML = date;
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  });
}

// Get todays weather.
function getWeather({lat,long}) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`)

  .then(function(weather) {
    return weather.json();
  }) 

  .then(function(weatherData){

    // console.log(weatherData);
    showText(weatherData);
    
  }) 
}

// Get 5 day weather forecast 
function get5Weather({lat,long}) {
  fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${key}`)

  .then(function(weather) {
    return weather.json();
  }) 

  .then(function(weatherData){

    // console.log(weatherData);
    showForecast(weatherData);
    
  }) 
}

// FOR CURRENT DAY 
function showText(weatherData){
    tempVal.innerHTML = weatherData.main.temp + "&deg;c";
    maxTempVal.innerHTML = weatherData.main.temp_max + "&deg;c";
    minTempVal.innerHTML = weatherData.main.temp_min + "&deg;c";
    feelVal.innerHTML = weatherData.main.feels_like + "&deg;c";

    humidVal.innerHTML = weatherData.main.humidity + '%';
    degVal.innerHTML = weatherData.wind.deg + '&#176';
    spdVal.innerHTML = weatherData.wind.speed + ' m/s';

    if (typeof weatherObj.state != 'undefined'){
      locVal.innerHTML = weatherData.name + ', ' + weatherObj.state;
    }
    else {
      locVal.innerHTML = weatherData.name;
    }
    weaVal.innerHTML = weatherData.weather[0].main + "... " + weatherData.weather[0].description;

    // getTime();
    // 
    // 

    lightText(locVal);
    lightText(weaVal);
    lightText(dateVal);
    weatherIcon.src = 'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png';
}

// FIVE DAY FORECAST
function showForecast(weatherData){
  // DAY 1
  day1Weather.innerHTML = weatherData.daily[0].weather[0].main + "... " + weatherData.daily[0].weather[0].description;

//   // GET DATE
  var unixDate = weatherData.daily[0].dt;
  var mil = unixDate * 1000;
  var date = new Date(mil);
  var futureDate = date.toLocaleString().split(",");
  day1Date.innerHTML = futureDate[0];

  day1Icon.src = 'https://openweathermap.org/img/wn/' + weatherData.daily[0].weather[0].icon + '@2x.png';
  day1Temp.innerHTML = weatherData.daily[0].temp.max + "&deg;c";
  day1WindSpd.innerHTML = weatherData.daily[0].wind_speed + 'm/s';
  day1Humid.innerHTML = weatherData.daily[0].humidity + '%';

  lightText(day1Weather);
  lightText(day1Date);

  // DAY 2
  day2Weather.innerHTML = weatherData.daily[1].weather[0].main + "... " + weatherData.daily[0].weather[0].description;

  // GET DATE
  var unixDate = weatherData.daily[1].dt;
  var mil = unixDate * 1000;
  var date = new Date(mil);
  var futureDate = date.toLocaleString().split(",");
  day2Date.innerHTML = futureDate[0];

  day2Icon.src = 'https://openweathermap.org/img/wn/' + weatherData.daily[1].weather[0].icon + '@2x.png';
  day2Temp.innerHTML = weatherData.daily[1].temp.max + "&deg;c";
  day2WindSpd.innerHTML = weatherData.daily[1].wind_speed + 'm/s';
  day2Humid.innerHTML = weatherData.daily[1].humidity + '%';

  lightText(day2Weather);
  lightText(day2Date);

// DAY 3
day3Weather.innerHTML = weatherData.daily[2].weather[0].main + "... " + weatherData.daily[0].weather[0].description;

// GET DATE
var unixDate = weatherData.daily[2].dt;
var mil = unixDate * 1000;
var date = new Date(mil);
var futureDate = date.toLocaleString().split(",");
day3Date.innerHTML = futureDate[0];

day3Icon.src = 'https://openweathermap.org/img/wn/' + weatherData.daily[2].weather[0].icon + '@2x.png';
day3Temp.innerHTML = weatherData.daily[2].temp.max + "&deg;c";
day3WindSpd.innerHTML = weatherData.daily[2].wind_speed + 'm/s';
day3Humid.innerHTML = weatherData.daily[2].humidity + '%';

lightText(day3Weather);
lightText(day3Date);

// DAY 4
day4Weather.innerHTML = weatherData.daily[3].weather[0].main + "... " + weatherData.daily[0].weather[0].description;

// GET DATE
var unixDate = weatherData.daily[3].dt;
var mil = unixDate * 1000;
var date = new Date(mil);
var futureDate = date.toLocaleString().split(",");
day4Date.innerHTML = futureDate[0];

day4Icon.src = 'https://openweathermap.org/img/wn/' + weatherData.daily[3].weather[0].icon + '@2x.png';
day4Temp.innerHTML = weatherData.daily[3].temp.max + "&deg;c";
day4WindSpd.innerHTML = weatherData.daily[3].wind_speed + 'm/s';
day4Humid.innerHTML = weatherData.daily[3].humidity + '%';

lightText(day4Weather);
lightText(day4Date);

// DAY 5
day5Weather.innerHTML = weatherData.daily[4].weather[0].main + "... " + weatherData.daily[0].weather[0].description;

// GET DATE
var unixDate = weatherData.daily[4].dt;
var mil = unixDate * 1000;
var date = new Date(mil);
var futureDate = date.toLocaleString().split(",");
day5Date.innerHTML = futureDate[0];

day5Icon.src = 'https://openweathermap.org/img/wn/' + weatherData.daily[4].weather[0].icon + '@2x.png';
day5Temp.innerHTML = weatherData.daily[4].temp.max + "&deg;c";
day5WindSpd.innerHTML = weatherData.daily[4].wind_speed + 'm/s';
day5Humid.innerHTML = weatherData.daily[4].humidity + '%';

lightText(day5Weather);
lightText(day5Date);
}

// Small function to shorten code 
function lightText(titles) {
  titles.classList.add('has-text-light');
}


// TODO: GET VALUE FROM SEARCH BAR
// TODO: PASS VALUE TO WEATHER
// TODO: CHANGE HTML VALUE/DATA WITH DATA PULLED FROM API
// TODO: REMEMBER LAST SEARCH AND CREATE A BUTTON IN PAST SEARCHES
// TODO: GIVE BUTTON VALUE TO CHANGE DATA TO THAT CITY
// TODO: **EXTRA** MOVE BUTTON TO THE TOP OF LIST
