import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Note from "./Note";

function NotesList() {
  const { notes, searchText, columnView } = useNoteAppContext();
  return (
    <div>
      {!notes.length && (
        <div className="d-flex flex-column align-items-center justify-content-center m-5 no-note">
          <h2>No Notes Found</h2>
          <p>
            Create a new note by clicking on the bar above or the <b>+</b> button below
          </p>
        </div>
      )}
      <div className={columnView ? "notes-list-column" : "notes-list-grid"}>
        {notes
          .filter((note) => {
            return (
              (note.is_archived === false) && (note.is_deleted === false)  &&
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
                has_checklist={note.has_checklist}
                is_deleted={note.is_deleted}
              />
            );
          })}
      </div>
    </div>
  );
}
export default NotesList;
