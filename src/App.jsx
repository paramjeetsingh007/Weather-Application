import { useState } from "react";
import axios from "axios";
import "./App.css";
import Dashboard from "./Dashboard"; // Import Dashboard component

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [showDashboard, setShowDashboard] = useState(true); // Show dashboard initially

  const handleChange = (e) => setCity(e.target.value);

  async function fetchData() {
    if (!city) {
      alert("Enter city name");
      return;
    }

    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    if (!apiKey) {
      console.error("API key is missing!");
      return;
    }

    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: city },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setWeather(response.data);
    } catch (error) {
      console.error(error);
      alert("City not found!");
    }
  }

  return (
    <div className="app-container">
      {showDashboard ? (
        <Dashboard onStart={() => setShowDashboard(false)} />
      ) : (
        <div className="weather-container">
          <button className="back-btn" onClick={() => setShowDashboard(true)}>
            ⬅Dashboard
          </button>
          <h1>🌤 Weather Forecast</h1>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleChange}
          />
          <button className="get-weather-btn" onClick={fetchData}>
            Get Weather
          </button>

          {weather && (
            <div className="details">
              <h2>{weather.location.name}, {weather.location.country}</h2>
              <div className="weather-info">
                <img src={weather.current.condition.icon} alt="weather icon" />
                <h3>{weather.current.temp_c}°C</h3>
                <p>{weather.current.condition.text}</p>
              </div>
              <div className="extra-details">
                <p>💨 Wind: {weather.current.wind_kph} kph</p>
                <p>💧 Humidity: {weather.current.humidity}%</p>
                <p>☁ Cloud: {weather.current.cloud}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
