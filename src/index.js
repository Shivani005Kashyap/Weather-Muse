import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "leaflet/dist/leaflet.css";
import { WeatherProvider } from './context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <WeatherProvider>
        <App />
      </WeatherProvider>
  </React.StrictMode>
);