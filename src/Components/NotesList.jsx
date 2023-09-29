import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Note from "./Note";

function NotesList() {
  const { notes, searchText, gridView } = useNoteAppContext();
  return (
    <div className={gridView ? "column-mode" : "notes-list"}>
      {notes
        .filter((note) => {
          return (
            searchText.toLowerCase() === "" ||
            note.title.toLowerCase().includes(searchText) ||
            note.todoItems.some((todoItem) =>
              todoItem.item.toLowerCase().includes(searchText)
            )
          );
        })
        .map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            todoItems={note.todoItems}
            date={note.date}
            color={note.color}
            label={note.label}
          />
        ))}
    </div>
  );
}
export default NotesList;
