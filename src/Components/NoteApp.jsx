import React, { useState } from "react";
import { NavBar, Header, NotesList, AddNote} from "./";
import NoteAppProvider from "../Provider/NoteAppProvider";


function NoteApp() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <NoteAppProvider>
      <NavBar />
      <div className={`${darkMode && "dark-mode"}`}>
        <div className="note-app-container">
          <Header handleToggleDarkMode={setDarkMode} />
          <NotesList />
          <div className="footer">
            <AddNote />
          </div>
        </div>
      </div>
    </NoteAppProvider>
  );
}

export default NoteApp;
