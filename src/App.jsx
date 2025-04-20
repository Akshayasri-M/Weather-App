import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  const getWeatherData = async () => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=7db7f4dc24f41ff2956b0ddce4ddf5da&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found"); // Throw an error if the city is invalid
      }
      let result = await response.json();
      setCity(result); // Set the city data
      setError(null); // Clear any previous error
    } catch (err) {
      setCity(null); // Clear city data if there's an error
      setError(err.message); // Set the error message
    }
  };

  useEffect(() => {
    if (search.trim() !== "") { // Only fetch data if search is not empty
      getWeatherData();
    }
  }, [search]);
  const getWeatherCondition = () => {
    if (!city) return ""; // Return an empty string if no city data is available
  
    const temp = city?.main?.temp; // Get the temperature
    const weatherDescription = city?.weather[0]?.main; // Get the main weather description (e.g., Rain, Clear, Clouds)
  
    if (weatherDescription === "Rain") {
      return "It's rainy outside. Don't forget your umbrella!";
    } else if (weatherDescription === "Clear") {
      return "It's sunny and clear. A great day to go outside!";
    } else if (weatherDescription === "Clouds") {
      return "It's cloudy. You might want to carry a light jacket.";
    } else if (weatherDescription === "Snow") {
      return "It's snowy. Stay warm and drive safely!";
    } else if (temp > 30) {
      return "It's hot and sunny. Stay hydrated!";
    } else if (temp < 10) {
      return "It's cold outside. Wear warm clothes!";
    } else {
      return "The weather is moderate. Enjoy your day!";
    }
  };

  return (
    <div className="App">
      <div className="weather-card">
        <div className="search">
          <input
            type="search"
            placeholder="Enter the city name"
            spellCheck="false"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={getWeatherData} className="search-button">Search</button>
        </div>
        {error && <p className="error">{error}</p>} {/* Error message */}
        {!city && (
          <div className="default-animation">
            <div className="icon-container">
              <img
                className="weather-icon"
                src="https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png"
                alt="Weather Icon"
              />
              <img
                className="humidity-icon"
                src="https://static-00.iconduck.com/assets.00/humidity-icon-2048x1675-xxsge5os.png"
                alt="Humidity Icon"
              />
            </div>
            <p className="animation-text">Your reliable weather companion.</p>
          </div>
        )}
   {city && (
  <div className="weather">
    <img
      className="weather-icon"
      src="https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png"
      alt="..."
    />
    <h1 className="temp">{city?.main?.temp}°C </h1>
    <h2 className="city">{city?.name}</h2>
    <p className="weather-condition">{getWeatherCondition()}</p> {/* Display weather condition */}
    <div className="details">
      <div style={{ display: "flex" }} className="col">
        <img
          className="humi"
          src="https://static-00.iconduck.com/assets.00/humidity-icon-2048x1675-xxsge5os.png"
          alt="Humidity Icon"
        />
        <div className="info">
          <p className="humidity">{city?.main?.humidity}%</p>
          <p>Humidity</p>
        </div>
      </div>
      <div className="col">
        <img
          src="https://cdn-icons-png.flaticon.com/512/136/136712.png"
          alt="Wind Icon"
        />
        <div className="info">
          <p className="wind">{city?.wind?.speed} km/h</p>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default App;