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
  let city = document.querySelector("#city-display");
  let temperature = document.querySelector("#temperature");
  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
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
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  let apiKey = "9bc8a95bb24bea24e1011758969f01a6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  console.log(cityInput.value);
}

cityForm.addEventListener("submit", searchCity);
