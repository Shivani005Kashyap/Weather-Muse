import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import icon from "./icons.png";

export default function Navbar({ mode, toggleMode }) {
  const isWinterMode = mode === "Winter Mode";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container-fluid">
        {/* Logo & Brand */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center"
        >
          <img
            src={icon}
            alt="WeatherMuse Logo"
            style={{
              height: "50px",
              width: "50px",
              marginRight: "10px",
            }}
          />
          <span>WeatherMuse</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/forecast">
                Forecast
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/weathermaps">
                Weather Maps
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {/* Theme Toggle */}
          <div className="form-check form-switch d-flex align-items-center">
            <input
              className="form-check-input mx-2"
              type="checkbox"
              role="switch"
              id="modeSwitch"
              checked={isWinterMode}
              onChange={toggleMode}
            />

            <label
              className={`form-check-label ${
                isWinterMode
                  ? "text-dark-mode"
                  : "text-light-mode"
              }`}
              htmlFor="modeSwitch"
            >
              {isWinterMode
                ? "Switch to Summer Mode ☀️"
                : "Switch to Winter Mode ❄️"}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}