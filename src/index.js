/*Search Display City

let city = document.querySelector("#city-display");
let cityForm = document.querySelector("#city-form");

function cityDisplay(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  city.innerHTML = cityInput.value; //igual ao valor retornado pela API
}

cityForm = addEventListener("submit", cityDisplay); */

//Date

let now = new Date();
let date = document.querySelector("#date");
let time = document.querySelector("#time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = days[now.getDay()];
let month = months[now.getMonth()];

date.innerHTML = `${day} ${now.getDate()} ${month}`;

//Time

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

time.innerHTML = `${now.getHours()}:${minutes}`;

//Celsius to Fahrenheit

let temperatureSelector = document.querySelector("#temperature");
let celsiusSelector = document.querySelector("#celsius-link");
let fahrenheitSelector = document.querySelector("#fahrenheit-link");

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = Number(temperatureSelector.innerHTML);
  temperatureSelector.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperature = Number(temperatureSelector.innerHTML);
  temperatureSelector.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

fahrenheitSelector.addEventListener("click", convertToFahrenheit);
celsiusSelector.addEventListener("click", convertToCelsius);

//Search Engine
let buttonCurrentLocation = document.querySelector("#button-link");

function showTemperature(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city-display");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9bc8a95bb24bea24e1011758969f01a6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

buttonCurrentLocation.addEventListener("click", getPosition);

let cityForm = document.querySelector("#city-form");

function searchCity(event) {
  console.log(cityInput.value);
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "9bc8a95bb24bea24e1011758969f01a6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

cityForm.addEventListener("submit", searchCity);

/*
function displayForecast(response) {
  let forecastweekdayElement = document.querySelector("#forecast-weekday");
  let forecastdateElement = document.querySelector("#forecast-date");
  let forecasttempElement = document.querySelector("#forecast-temp");
  let forecasticonElement = document.querySelector("#forecast-icon");

  forecastweekdayElement.innerHTML = null;
  forecastdateElement.innerHTML = null;
  forecasttempElement.innerHTML = null;
  forecasticonElement.innerHTML = null;

  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += */
