import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  NoteApp,
  NavBar,
  ArchivedNotes,
  LabelFilteredList,
  Profile,
  RegisterForm,
  LogInForm,
} from "./";
import NoteAppProvider from "../Provider/NoteAppProvider";
import { ProtectedRoute } from "./ProtectedRoute";

function Main() {
  return (
    <div>
      <NoteAppProvider>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LogInForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <NoteApp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/archived_notes"
            element={
              <ProtectedRoute>
              <ArchivedNotes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/labels/:param_name/:param_id"
            element={
              <ProtectedRoute>
              <LabelFilteredList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
              <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </NoteAppProvider>
    </div>
  );
}

export default Main;
