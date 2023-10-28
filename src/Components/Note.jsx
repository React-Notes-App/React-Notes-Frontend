import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import PropTypes from "prop-types";
import EditNote from "./EditNote";
import ColorPalette from "./ColorPalette";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import ItemList from "./ItemList";
import NoteTitle from "./NoteTitle";
import  HighlightOffIcon from "@mui/icons-material/HighlightOff";

function Note({ id, title, items, date, color, labels, is_archived }) {
  Note.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        notes_id: PropTypes.number.isRequired,
        item_name: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      }).isRequired
    ).isRequired,
    date: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label_name: PropTypes.string.isRequired,
      })
    ).isRequired,
    is_archived: PropTypes.bool.isRequired,
  };

  const { deleteNote, archiveNote, unarchiveNote } = useNoteAppContext();
  const noteId = id;

  const handleDeleteNoteClick = () => {
    deleteNote(noteId);
  };

  const handleArchiveNoteClick = () => {
    archiveNote(noteId);
  };

  const handleUnarchiveNoteClick = () => {
    unarchiveNote(noteId);
  };

  return (
    <div>
      <div className="note" style={{ backgroundColor: color }}>
        <div className="d-flex justify-content-between align-items-center">
          <NoteTitle id={id} title={title} />
          <div className="d-flex align-items-center">
            <EditNote
              id={id}
              title={title}
              items={items}
              color={color}
              labels={labels}
            />
            <ColorPalette id={id} color={color} />
          </div>
        </div>

        <div className="itemListBackground" style={{ paddingLeft: "0px" }}>
          {items
            ?.filter((item) => {
              return item.completed === false;
            })
            .map((item) => (
              <ItemList item={item} key={item.id} />
            ))}
        </div>
        <hr className="horizontal-rule" />
        <div className="itemListBackground" style={{ paddingLeft: "0px" }}>
          {items
            ?.filter((item) => {
              return item.completed === true;
            })
            .map((item) => (
              <ItemList item={item} key={item.id} />
            ))}
        </div>
        <div>
          {labels?.map((label) => (
            <div key={label.id} >
              <small className="note-label">{label.label_name}</small>
              <HighlightOffIcon className="label-delete-icon" />
            </div>
          ))}
        </div>
        <div className="note-footer">
          <small>{date}</small>
          <div>
            {is_archived === false ? (
              <ArchiveOutlinedIcon
                className=""
                onClick={handleArchiveNoteClick}
              />
            ) : (
              <UnarchiveOutlinedIcon
                className=""
                onClick={handleUnarchiveNoteClick}
              />
            )}
            <DeleteForeverOutlinedIcon
              className="deleteIcon"
              onClick={handleDeleteNoteClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
