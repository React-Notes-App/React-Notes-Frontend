import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { NotesList, AddNote, AddNoteBar, PleaseLogin } from "./";
import LogInForm from "./LogInForm";

function NoteApp() {
  const { darkMode, isLoggedIn } = useNoteAppContext();
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="note-app-container">
        <AddNoteBar />
        {isLoggedIn ? (
        <NotesList />
        ) : (
          <>
          <PleaseLogin />
          <LogInForm />
          </>
        )}
        <div className="footer">
          <AddNote />
        </div>
      </div>
    </div>
  );
}

export default NoteApp;
