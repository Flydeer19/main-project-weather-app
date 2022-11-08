function displayTemperature(response) {
    console.log(response);
    let temperatureElement = document.querySelector("#current-temperature");
    let cityElement = document.querySelector("#city");
    let conditionElement = document.querySelector("#condition");

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    conditionElement.innerHTML = response.data.weather[0].description;
}

let apiKey = "8ca7dd4e61360b90fb66918853670e48";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);