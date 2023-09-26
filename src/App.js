import React, { useState } from "react";
import NavBar from "./Components/NavBar";
import "./App.css";

function App() {
  // const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
