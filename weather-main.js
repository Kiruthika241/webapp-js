const apiKey = "37206834ef5c71a90caef86d04d7d801";

const searchBtn = document.querySelector(".Search-btn");
const cityInput = document.querySelector(".city-input");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      showWeather(data);
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

function showWeather(data) {
  const weatherBox = document.createElement("div");
  weatherBox.className = "weather-details";

  const temp = data.main.temp;
  const condition = data.weather[0].description;
  const city = data.name;
  const country = data.sys.country;

  weatherBox.innerHTML = `
    <h4>${city}, ${country}</h4>
    <p>Temperature: ${temp}°C</p>
    <p>Condition: ${condition}</p>
  `;

  // Remove old weather data if exists
  const oldWeather = document.querySelector(".weather-details");
  if (oldWeather) {
    oldWeather.remove();
  }

  document.querySelector(".panel").appendChild(weatherBox);
}
