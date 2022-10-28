function showDate (date) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let currentDay = days[date.getDay()];
    let currentHour = date.getHours();
        if (currentHour < 10) {
            currentHour = `0${currentHour}`;
        }
    let currentMinute = date.getMinutes();
        if (currentMinute < 10) {
        currentMinute = `0${currentMinute}`;
        }
    let dateResult = `${currentDay} ${currentHour}:${currentMinute}`;
    return dateResult;
}

let currentDate = document.querySelector("#current-day");
currentDate.innerHTML = showDate((new Date()));




function showCity(event) {
    event.preventDefault();
    let displayedCity = document.querySelector("#city");
    let inputCity = document.querySelector("#input-field").value;
    inputCity = inputCity.toLowerCase();
    inputCity = inputCity.trim();
    let wordPart = inputCity.split(" ");
    for (let i=0; i < wordPart.length; i++) {
        wordPart[i] = wordPart[i].charAt(0).toUpperCase() + wordPart[i].slice(1);
    }
    displayedCity.innerHTML = `${wordPart.join(" ")}`;
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", showCity);
searchBar.addEventListener("submit", showTemperatureCelcias);

function showCurrentTemp(response) {
    let currentTemp = Math.round(response.data.main.temp);
    let currentTempCelcias = document.querySelector("#current-temperature");
    currentTempCelcias.innerHTML = currentTemp;
}

function showTemperatureCelcias (event) {
    event.preventDefault();

    let inputCity = document.querySelector("#input-field").value;
    inputCity = inputCity.toLowerCase();
    inputCity = inputCity.trim();
    let wordPart = inputCity.split(" ");
    for (let i=0; i < wordPart.length; i++) {
        wordPart[i] = wordPart[i].charAt(0).toUpperCase() + wordPart[i].slice(1);
    }

    let apiKey = "8ca7dd4e61360b90fb66918853670e48";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${wordPart.join(" ")}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showCurrentTemp);

}

function retrieveCoords (position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "8ca7dd4e61360b90fb66918853670e48";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showCurrentTemp);
}

function showLocation() {
    navigator.geolocation.getCurrentPosition(retrieveCoords);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showLocation);
currentLocation.addEventListener("click", showGeolocation);

function retrieveCityName(response) {
    console.log(response);
    let currentCityName = response.data.name;
    let currentCountryCode = response.data.sys.country;
    let displayedCity = document.querySelector("#city");
    displayedCity.innerHTML = `${currentCityName}, ${currentCountryCode}`;
}


function showCurrentCity(position) {

    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "8ca7dd4e61360b90fb66918853670e48";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(retrieveCityName)

}


function showGeolocation() {
navigator.geolocation.getCurrentPosition(showCurrentCity);
}
