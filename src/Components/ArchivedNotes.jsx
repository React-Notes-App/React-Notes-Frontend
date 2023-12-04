import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Note from "./Note";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

function ArchivedNotes() {
  const { searchText, columnView, darkMode, archivedNotes} =
    useNoteAppContext();


    return (
      <div className={`${darkMode && "dark-mode"}`}>
        {archivedNotes.length > 0 ? (
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
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-column p-5 gap-5">
          <ArchiveOutlinedIcon sx={{fontSize: 80}}/>
          <h2 className="text-center">No Archived Notes yet.</h2>
        </div>
      )}
      </div>
    );
  }
export default ArchivedNotes;
