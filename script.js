const $ = document.querySelector.bind(document);
const apiKey = "36312e38251a161991183584dcfe5e5b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const main = $(".weather");
const err = $(".err");
const searchBox = $(".search input");
const searchBtn = $(".search button");

async function getWeather(address) {
  const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${address}`);
  const data = await response.json();

  if (response.status == 404) {
    err.style.display = "block";
    main.style.display = "none";
  } else {
    main.innerHTML = `
    <img src="./images/rain.png" alt="" class="weather-icon" />
          <h1 class="temp">2°c</h1>
          <h2 class="city">New York</h2>
          <div class="details">
            <div class="col">
              <img src="./images/humidity.png" alt="" />
              <div>
                <p class="humidity">50%</p>
                <p>Humidity</p>
              </div>
            </div>
  
            <div class="col">
              <img src="./images/wind.png" alt="" />
              <div>
                <p class="wind">15 km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
    `;
    const weatherIcon = $(".weather-icon");
    const temp = $(".temp");
    const city = $(".city");
    const humidity = $(".humidity");
    const wind = $(".wind");
    temp.innerHTML = Math.round(data.main.temp) + "°c";
    city.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/h";
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "./images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./images/mist.png";
    }

    err.style.display = "none";
    main.style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  const address = searchBox.value;
  getWeather(address);
});
