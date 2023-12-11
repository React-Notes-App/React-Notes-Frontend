import React from "react";
import { useParams } from "react-router-dom";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { Note, AddNoteBar, AddNote } from "./";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";

function DeletedNotes() {
  const { searchText, columnView, darkMode, trashedNotes } =
    useNoteAppContext();

  const { param_is_deleted } = useParams();
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="note-app-container">
        <AddNoteBar param_is_deleted={param_is_deleted} />
        {!trashedNotes.length ? (
          <div className="d-flex justify-content-center align-items-center flex-column p-5 gap-5">
            <DeleteForeverOutlined sx={{ fontSize: 80 }} />
            <h2 className="text-center">No Deleted Notes yet.</h2>
          </div>
        ) : (
          <div className={columnView ? "notes-list-column" : "notes-list-grid"}>
            {trashedNotes
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
                    is_deleted={note.is_deleted}
                  />
                );
              })}
          </div>
        )}
        <div className="footer">
          <AddNote param_is_deleted={param_is_deleted} />
        </div>
      </div>
    </div>
  );
}

export default DeletedNotes;
