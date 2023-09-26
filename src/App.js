import React, { useState } from "react";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import NoteAppProvider from "./Provider/NoteAppProvider";
import "./App.css";
import NotesList from "./Components/NotesList";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <NoteAppProvider>
      <NavBar />
      <div className={`${darkMode && "dark-mode"}`}>
        <div className="note-app-container">
          <Header handleToggleDarkMode={setDarkMode} />
          <NotesList />
        </div>
      </div>
    </NoteAppProvider>
  );
}

export default App;
