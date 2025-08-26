import { useState, useEffect } from "react";
import "./index.css";

const KEY = "4d60475808d140eb9ff192950252508";

function App() {
  const [city, setCity] = useState("Москва");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getWeatherData() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}`
        );
        setError(null);
        if (!res.ok) {
          throw new Error("Введите корректное название города");
        }
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getWeatherData();
  }, [city]);

  function renderLoading() {
    return <p>Загрузка...</p>;
  }

  function renderError() {
    return <p>{error}</p>;
  }

  function renderWeather() {
    return (
      <div className="weather-card">
        <h2>
          {weatherData?.location?.country}, {weatherData?.location?.name}
        </h2>
        <img
          src={weatherData?.current?.condition?.icon}
          alt="icon"
          className="weather-icon"
        />
        <p className="temperature">
          {Math.round(weatherData?.current?.temp_c)}°C
        </p>
        <p className="condition">{weatherData?.current?.condition?.text}</p>
        <div className="weather-details">
          <p>Влажность: {Math.round(weatherData?.current?.humidity)}%</p>
          <p>Ветер: {Math.round(weatherData?.current?.wind_kph)} км/ч</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="widget-container">
        <div className="weather-card-container">
          <h1 className="app-title">Погода</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Введите название города"
              className="search-input"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
        </div>

        {loading && renderLoading()}
        {error && renderError()}
        {!error && !loading && weatherData && renderWeather()}
      </div>
    </div>
  );
}

export default App;
