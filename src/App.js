import React, { useState, useEffect } from "react";
import weatherFetch from "./functions/api-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./assets/searchbar.css";
import "./assets/weathercard.css";
import bonoksphere from "./assets/bonkosphere.png"

function App() {
  const [storedWeather, setStoredWeather] = useState();
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weatherIconUrl, setWeatherIconUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryInput = document.getElementById("searchbar").value;
    await weatherFetch(queryInput).then((data) => {
      setStoredWeather(data);
    });
  };

  useEffect(() => {
    if (storedWeather) {
      setWeatherIcon(storedWeather.weather[0].icon);
      const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
      setWeatherIconUrl(iconUrl);
    }
  }, [storedWeather, weatherIcon]);

  return (
    <div className="app">
      <header className="page-header">
        <div className="search-bar">
          <img id="bonoksphere" height={200} src={bonoksphere} alt="bonkosphere" />
          <form className="search-form" onSubmit={(e) => handleSubmit(e)}>
            <input
              className="search-input"
              id="searchbar"
              placeholder="Please enter a city or zip code.."
              autoComplete="off"
              autoCorrect="off"
              required
            />
            <button className="search-button" formAction="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
      </header>
      <body className="page-content">
        {storedWeather ? (
          <div className="weather-sticky-notes">
            <div className="weather-content-container">
              <img id="wicon" src={weatherIconUrl} alt="Weather icon" />
              <h5 className="city-name">{storedWeather.name}</h5>
              <div className="weather-content-body">
                <div className="city-temperature">
                  It is currently: {Math.floor(storedWeather.main.temp)}F
                </div>

                <div className="city-feels-like">
                  Feels like: {Math.floor(storedWeather.main.feels_like)}F
                </div>

                <div className="city-current-weather">
                  Current weather: {storedWeather.weather[0].main}
                </div>
                <div className="city-current-wind">
                  {Math.floor(storedWeather.wind.speed)} mph winds
                </div>
              </div>
            </div>
          </div>

        ) : (
          <div className="no-data-message">No Data</div>
        )
        }

      </body >
    </div >
  );
}

export default App;
