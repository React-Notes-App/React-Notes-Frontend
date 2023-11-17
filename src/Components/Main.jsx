import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  NoteApp,
  NavBar,
  ArchivedNotes,
  LabelFilteredList,
  Profile
} from "./";
import NoteAppProvider from "../Provider/NoteAppProvider";


function Main() {
  return (
    <div>
      <NoteAppProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<NoteApp />} />
          <Route path="/archived_notes" element={<ArchivedNotes />} />
          <Route path="/labels/:id" element={<LabelFilteredList />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </NoteAppProvider>
    </div>
  );
}

export default Main;
