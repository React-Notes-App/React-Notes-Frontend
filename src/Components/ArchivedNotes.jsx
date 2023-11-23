import React from "react";
import { Navigate } from "react-router-dom";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Note from "./Note";

function ArchivedNotes() {
  const { searchText, columnView, darkMode, archivedNotes, isLoggedIn } =
    useNoteAppContext();

  // if (!isLoggedIn) {
  //   console.log("not logged in");
  //   return <Navigate to="/" />;
  // } else {
    return (
      <div className={`${darkMode && "dark-mode"}`}>
        <div className="note-app-container">
          <div className={columnView ? "notes-list-column" : "notes-list-grid"}>
            {archivedNotes
              .filter((note) => {
                return (
                  searchText.toLowerCase() === "" ||
                  note.title.toLowerCase().includes(searchText) ||
                  note.items.some((item) =>
                    item.item_name.toLowerCase().includes(searchText)
                  )
                );
              })
              .map((note) => {
                return (
                  <Note
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    items={note.items}
                    date={note.date}
                    color={note.color}
                    labels={note.labels}
                    is_archived={note.is_archived}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
//}
export default ArchivedNotes;
