import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Note from "./Note";

function NotesList() {
  const { notes, searchText, columnView } = useNoteAppContext();
  return (
    <div className={columnView ? "notes-list-column" : "notes-list-grid"}>
      {notes
        .filter((note) => {
          return (
            note.is_archived === false &&
            (searchText.toLowerCase() === "" ||
              note.title.toLowerCase().includes(searchText) ||
              note.items.some((item) =>
                item.item_name.toLowerCase().includes(searchText)
              ))
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
  );
}
export default NotesList;
