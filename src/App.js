 import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import About from "./components/About";
import WeatherMaps from "./components/WeatherMaps";
import Contact from "./components/Contact";
import Design from "./components/Design";

export default function App() {
  const [mode, setMode] = useState("Summer Mode");

  const toggleMode = () => {
    if (mode === "Summer Mode") {
      setMode("Winter Mode");
    } else {
      setMode("Summer Mode");
    }
  };

  return (
    <Router>
      <div className={mode === "Winter Mode" ? "winter-mode" : "summer-mode"}>
        <Navbar mode={mode} toggleMode={toggleMode} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forecast" element={<Design />} />
          <Route path="/about" element={<About />} />
          <Route path="/weathermaps" element={<WeatherMaps />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}