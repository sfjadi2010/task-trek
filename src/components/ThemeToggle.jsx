import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      <div className="toggle-container">
        <div className={`toggle-circle ${isDarkMode ? "dark" : "light"}`}>
          {isDarkMode ? "🌙" : "☀️"}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
