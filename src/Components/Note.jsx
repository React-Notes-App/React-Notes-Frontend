import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import PropTypes from "prop-types";
import EditNote from "./EditNote";
import ColorPalette from "./ColorPalette";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ItemList from "./ItemList";

function Note({ id, title, todoItems, date, color, label }) {
  Note.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    todoItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        item: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      }).isRequired
    ).isRequired,
    date: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    label: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  };

  const { deleteNote } = useNoteAppContext();

  function handleDeleteNoteClick() {
    deleteNote(id);
  }

  
  return (
    <div>
      <div className="note" style={{ backgroundColor: color }}>
        <div className="d-flex justify-content-between align-items-center">
          <h5 style={{ margin: 0 }}>{title}</h5>
          <div className="d-flex align-items-center">
            <EditNote
              id={id}
              todoItems={todoItems}
              color={color}
              title={title}
            />
            <ColorPalette id={id} color={color} />
          </div>
        </div>
        
        <div className="itemListBackground" style={{ paddingLeft: "0px" }}>
          {todoItems?.filter((todoItem) => {
          return todoItem.completed === false;
          }).map((todoItem) => (
            <ItemList todoItem={todoItem} key={todoItem.id} />
          ))}
        </div>
        <hr className="horizontal-rule"/>
        <div className="itemListBackground" style={{ paddingLeft: "0px" }}>
          {todoItems?.filter((todoItem) => {
          return todoItem.completed === true;
          }).map((todoItem) => (
            <ItemList todoItem={todoItem} key={todoItem.id} />
          ))}
        </div>
        <div>
          {label?.map((label) => (
            <div key={label.id} className="label">
              <small>{label.title}</small>
            </div>
          ))}
          </div>
        <div className="note-footer">
          <small>{date}</small>
          <DeleteForeverIcon
            className="deleteIcon"
            onClick={handleDeleteNoteClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Note;
