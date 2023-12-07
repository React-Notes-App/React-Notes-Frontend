import React from "react";
import { useParams } from "react-router-dom";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { Note, AddNoteBar, AddNote } from "./";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";

function LabelFilteredList() {
  const { param_id } = useParams();
const { param_name } = useParams();
  const { notes, columnView, searchText, darkMode } = useNoteAppContext();

  const filteredNotes = notes.filter((note) => {
    return note.labels.some((label) => label.id === parseInt(param_id));
  });

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="note-app-container">
        <AddNoteBar param_id={param_id} param_name={param_name}/>
        <div className={columnView ? "notes-list-column" : "notes-list-grid"}>
          {filteredNotes.length > 0 ? (
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
            <div className="d-flex justify-content-center align-items-center flex-column p-5 gap-5">
              <LabelOutlinedIcon sx={{ fontSize: 80 }} />
              <h2 className="text-center">No Notes with that label yet.</h2>
            </div>
          )}
        </div>
        <div className="footer">
          <AddNote />
        </div>
      </div>
    </div>
  );
}

export default LabelFilteredList;
