function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`;
}


function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let cityElement = document.querySelector("#city");
    let conditionElement = document.querySelector("#condition");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let dateElement = document.querySelector("#current-day");
    let iconElement = document.querySelector("#main-icon");
    celciusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celciusTemperature);
    cityElement.innerHTML = response.data.name;
    conditionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function search(city) {
    let apiKey = "8ca7dd4e61360b90fb66918853670e48";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

}


function handleSubmit(event) {
    event.preventDefault();

    let cityInputElement = document.querySelector("#input-field");
    cityInputElement = cityInputElement.value.trim();
    search(cityInputElement);
}

function showFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temperature");
    let fahrenheitTemperature = (celciusTemperature * 9 / 5) + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelciusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemperature);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelciusTemperature);

search("Kyiv");