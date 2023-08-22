"use strict";

const loading = document.querySelector(".loading");

const city = document.getElementById("city");

const temp = document.querySelector(".temp");

const input = document.querySelector(".search-bar");

const btn = document.getElementById("search-btn");

const weather = document.querySelector(".weather");

const icon = document.querySelector(".icon");

const humidity = document.querySelector(".humidity");

const wind = document.querySelector(".wind");

const API_key = "5c1e801a98de55b805c069472e3bdc3a";

weather.classList.add("hidden");

// weather.classList.remove("loading");

const fetchAPI = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
    );
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    console.log(data);
    displayCity(data);
    console.log(document.body.style.backgroundImage);

    document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${data.name})`;
    weather.classList.remove("loading");
  } catch {
    document.body.style.backgroundImage = "none";
    weather.classList.add("loading");
  }
};

const displayCity = (data) => {
  weather.classList.remove("hidden");
  city.innerText = `Weather in ${data.name}`;
  temp.innerText = `${Math.round(data.main.temp)}°C`;
  icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  humidity.textContent = `Humidity ${data.main.humidity}%`;
  wind.textContent = `Wind speed: ${data.wind.speed}km`;
};

btn.addEventListener("click", () => {
  weather.classList.add("loading");
  const inputValue = input.value.trim();
  fetchAPI(inputValue);
  input.value = "";
});

window.addEventListener("keydown", (e) => {
  weather.classList.add("loading");
  if (e.code === "Enter") {
    const inputValue = input.value.trim();
    fetchAPI(inputValue);
    input.value = "";
  }
});
