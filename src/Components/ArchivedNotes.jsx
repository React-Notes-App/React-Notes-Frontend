import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Note from "./Note";

function ArchivedNotes() {
  const { notes, archivedNotes, searchText, columnView, isLoggedIn, darkMode } =
    useNoteAppContext();
  //   console.log("notes: ", archivedNotes);
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="note-app-container">
        <div className={columnView ? "notes-list-column" : "notes-list-grid"}>
          {isLoggedIn && archivedNotes ? (
            archivedNotes
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
              })
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <h1 className="text-center">There are no archived notes</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArchivedNotes;
