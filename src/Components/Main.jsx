import React from "react";
import { Routes, Route } from "react-router-dom";
import { NoteApp, Register } from "./";

function Main() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NoteApp />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default Main;
