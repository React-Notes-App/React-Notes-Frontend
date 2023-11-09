import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { NotesList, AddNote, AddNoteBar, PleaseLogin } from "./";

function NoteApp() {
  const { darkMode, isLoggedIn } = useNoteAppContext();
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="note-app-container">
        <AddNoteBar />
        {isLoggedIn ? (
        <NotesList />
        ) : (
          <PleaseLogin />
        )}
        <div className="footer">
          <AddNote />
        </div>
      </div>
    </div>
  );
}

export default NoteApp;
