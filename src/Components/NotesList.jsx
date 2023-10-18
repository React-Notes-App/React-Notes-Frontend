import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Note from "./Note";

function NotesList() {
  const { notes, searchText, columnView, isLoggedIn } = useNoteAppContext();
  // console.log('notes: ', notes)
  return (
    <div className={columnView ? "notes-list-column" : "notes-list-grid"}>
      {isLoggedIn ? (
      notes
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
          // console.log('note: ', note);
          return (<Note
            key={note.id}
            id={note.id}
            title={note.title}
            items={note.items}
            date={note.date}
            color={note.color}
            labels={note.labels}
          />)
          })
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="text-center">Please log in to see your notes</h1>
        </div>
      )}
    </div>
  );
}
export default NotesList;
