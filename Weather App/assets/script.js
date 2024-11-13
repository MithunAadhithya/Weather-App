const apikey = "90195d98eb07835f0273200b8aeb2a4a";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input"); // Fixed selector
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon"); // Use querySelector for a single element

async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found');
            return;
        }

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "assets/images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "assets/images/clear.pngts";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "assets/images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "assets/images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "assets/images/mist.png";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
