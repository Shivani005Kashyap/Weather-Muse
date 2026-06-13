import "./styles/WeatherMaps.css";
import React, { useState} from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import axios from "axios";

/* ---------------------------
   MOVE MAP COMPONENT
--------------------------- */
function FlyToCity({ coords }) {
  const map = useMap();

  if (coords) {
    map.flyTo([coords.lat, coords.lon], 10, {
      duration: 1.5,
    });
  }

  return null;
}

/* ---------------------------
   CLICK WEATHER HANDLER
--------------------------- */
function MapClickHandler({ apiKey, setWeather }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
      );

      setWeather(res.data);
    },
  });

  return null;
}

/* ---------------------------
   MAIN COMPONENT
--------------------------- */
export default function WeatherMaps() {
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  const [layer, setLayer] = useState("precipitation");
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState(null);

  const layers = {
    precipitation: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    temp: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    wind: `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`,
  };

  /* ---------------------------
     SEARCH CITY
  --------------------------- */
  const searchCity = async () => {
    if (!city) return;

    const res = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );

    if (res.data.length > 0) {
      setCoords({
        lat: res.data[0].lat,
        lon: res.data[0].lon,
        name: res.data[0].name,
      });

      // also get weather
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${res.data[0].lat}&lon=${res.data[0].lon}&appid=${apiKey}&units=metric`
      );

      setWeather(weatherRes.data);
    }
  };

  if (!apiKey) {
    return <p>Missing API key</p>;
  }

  return (
    <div className="weather-maps-container">
      <h1>Weather Maps</h1>

      {/* 🌍 SEARCH BAR */}
      <div className="map-search">
        <input
          type="text"
          placeholder="Search city (e.g. Delhi, London...)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={searchCity}>🔍 Search</button>
      </div>

      {/* 🎛️ CONTROLS */}
      <div className="map-controls">
        <button onClick={() => setLayer("precipitation")}>🌧️ Rain</button>
        <button onClick={() => setLayer("temp")}>🌡️ Temp</button>
        <button onClick={() => setLayer("wind")}>💨 Wind</button>
      </div>

      {/* 🌍 MAP */}
      <div className="map-wrapper">
        <MapContainer
          center={[28.6139, 77.2090]}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: "600px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <TileLayer url={layers[layer]} />

          <MapClickHandler apiKey={apiKey} setWeather={setWeather} />

          <FlyToCity coords={coords} />
        </MapContainer>
      </div>

      {/* 🌡️ WEATHER CARD */}
      {weather && (
        <div className="map-card">
          <h3>📍 Weather Details</h3>
          <p>City: {weather.name}</p>
          <p>Temp: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}