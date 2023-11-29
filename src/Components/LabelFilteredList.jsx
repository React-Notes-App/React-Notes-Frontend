import React from "react";
import { useParams } from "react-router-dom";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Note from "./Note";

function LabelFilteredList() {
  const { id } = useParams();
  const { notes, isLoggedIn, columnView, searchText, darkMode } =
    useNoteAppContext();

  const filteredNotes = notes.filter((note) => {
    return note.labels.some((label) => label.id === parseInt(id));
  });

 
    return (
      <div className={`${darkMode && "dark-mode"}`}>
        <div className="note-app-container">
          <div className={columnView ? "notes-list-column" : "notes-list-grid"}>
            {isLoggedIn && filteredNotes ? (
              filteredNotes
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
                      has_checklist={note.has_checklist}
                    />
                  );
                })
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <h1 className="text-center">No Notes with that label.</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }


export default LabelFilteredList;
