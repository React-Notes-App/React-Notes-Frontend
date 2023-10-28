import React from "react";
import { Routes, Route } from "react-router-dom";
import { NoteApp, Register, NavBar, ArchivedNotes, LabelFilteredList } from "./";
import NoteAppProvider from "../Provider/NoteAppProvider";

function Main() {
  // const routes = [
  //   {
  //     path: "/",
  //     element: <NoteApp />,
  //   },
  //   {
  //     path: "/register",
  //     element: <Register />,
  //   },
  //   {
  //     path: "/archived_notes",
  //     element: <ArchivedNotes />,
  //   },
  // ];
  // const routeComponents = routes.map(({ path, element }) => (
  //   <Route key={path} path={path} element={element} />
  // ));

  return (
    <div>
      <NoteAppProvider>
        <NavBar />
        {/* <Routes>{routeComponents}</Routes> */}
        <Routes>
          <Route path="/" element={<NoteApp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/archived_notes" element={<ArchivedNotes />} />
          <Route path="/labels/:id" element={<LabelFilteredList />} />
        </Routes>
      </NoteAppProvider>
    </div>
  );
}

export default Main;
