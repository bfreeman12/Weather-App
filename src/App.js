import React, { useState, useEffect } from "react";
import weatherFetch from "./functions/api-query";

function App() {

  const [storedWeather, setStoredWeather] = useState()
  const handleClick = async (e) => {
    e.preventDefault();
    const queryInput = document.getElementById("searchbar").value
    await weatherFetch(queryInput).then((data) => {
      setStoredWeather(data)
    })
  }

  useEffect(() => {
    if (storedWeather) {
      console.log(storedWeather)
    }
  }, [storedWeather])

  return (
    <div className="app">
      <div className="search-bar">
        <input id="searchbar" placeholder="Please enter a city or zip code.." />
        <button onClick={e => handleClick(e)}>Submit</button>
      </div>
      <div className="weather-content-container">
        weather content goes here
      </div>
    </div>
  );
}

export default App;
