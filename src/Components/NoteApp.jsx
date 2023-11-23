import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { NotesList, AddNote, AddNoteBar } from "./";

function NoteApp() {
  const { darkMode, isLoggedIn, } = useNoteAppContext();
console.log(isLoggedIn);



    return (
      <div className={`${darkMode && "dark-mode"}`}>
        <div className="note-app-container">
          <AddNoteBar />
          <NotesList />
          <div className="footer">
            <AddNote />
          </div>
        </div>
      </div>
    );
 }

export default NoteApp;
