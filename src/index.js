//Init

function init() {
  let apiKey = "9bc8a95bb24bea24e1011758969f01a6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=lisbon&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=lisbon&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

init();

//Date

let now = new Date();
let date = document.querySelector("#date-display");
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
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

time.innerHTML = `${hours}:${minutes}`;

//Unit Conversion

let temperatureElement = document.querySelector("#display-temperature");
let celsiusElement = document.querySelector("#celsius-link");
let fahrenheitElement = document.querySelector("#fahrenheit-link");

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

fahrenheitElement.addEventListener("click", convertToFahrenheit);
celsiusElement.addEventListener("click", convertToCelsius);

//Search Engine
let buttonCurrentLocation = document.querySelector("#button-link");

function showTemperature(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city-display");
  let temperatureElement = document.querySelector("#display-temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon-main");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let celsiusTemperature = null;

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9bc8a95bb24bea24e1011758969f01a6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

buttonCurrentLocation.addEventListener("click", getPosition);

let cityForm = document.querySelector("#city-form");

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
            <div class="card">
            <div class="card-body text-center">
              <h6 class="card-subtitle mb-2 text-muted daydate">
                <div id="time-stamp">${formatHours(forecast.dt * 1000)}</div>
              </h6>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png"
                class="card-img-center"
                alt="sunny"
                id="icon"
              />
              <h6 class="card-subtitle mb-2 text-primary text-center">
                <br /><div class="maxtemp"><strong>${Math.round(
                  forecast.main.temp_max
                )}°C</strong></div>
                <div class="text-muted">${Math.round(
                  forecast.main.temp_min
                )}°C</div>
              </h6>
            </div>
            </div>
        `;
  }

  console.log(response.data.list[0]);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "9bc8a95bb24bea24e1011758969f01a6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  console.log(cityInput.value);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

cityForm.addEventListener("submit", searchCity);

function initGetPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
initGetPosition();
