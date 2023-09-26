import React, { useState } from "react";
import { Header, NotesList, AddNote} from "./";



function NoteApp() {
  const [darkMode, setDarkMode] = useState(false);
  return (
  
  
      <div className={`${darkMode && "dark-mode"}`}>
        <div className="note-app-container">
          <Header handleToggleDarkMode={setDarkMode} />
          <NotesList />
          <div className="footer">
            <AddNote />
          </div>
        </div>
      </div>
 
  );
}

export default NoteApp;
