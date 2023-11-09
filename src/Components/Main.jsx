import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  NoteApp,
  NavBar,
  ArchivedNotes,
  LabelFilteredList,
  NoArchivedNotes,
} from "./";
import NoteAppProvider from "../Provider/NoteAppProvider";
import { useNoteAppContext } from "../Provider/NoteAppProvider";

function Main() {
  const { isLoggedIn, archivedNotes } = useNoteAppContext();
  return (
    <div>
      <NoteAppProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<NoteApp />} />
          {isLoggedIn && archivedNotes.length ? (
            <Route path="/archived_notes" element={<ArchivedNotes />} />
          ) : (
            <Route path="/archived_notes" element={<NoArchivedNotes />} />
          )}
          <Route path="/labels/:id" element={<LabelFilteredList />} />
        </Routes>
      </NoteAppProvider>
    </div>
  );
}

export default Main;
