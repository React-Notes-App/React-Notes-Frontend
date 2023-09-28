import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { NotesList, AddNote } from "./"

function NoteApp() {
  const { darkMode } = useNoteAppContext();
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="note-app-container">
        <NotesList />
        <div className="footer">
          <AddNote />
        </div>
      </div>
    </div>
  );
}

export default NoteApp;
