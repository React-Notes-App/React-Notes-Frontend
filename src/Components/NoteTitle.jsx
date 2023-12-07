import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Form from "react-bootstrap/Form";

function NoteTitle({ id, title }) {
  const { editNoteTitle } = useNoteAppContext();

  const styles = {
    border: "none",
    backgroundColor: "transparent",
    fontSize: "1rem",
    paddingLeft: "0",
    boxShadow: "none",
  };

  const handleTitleSubmit = (e) => {
    const newTitle = e.target.value;
    if (e.keyCode === 13 && newTitle.trim().length > 0) {
      editNoteTitle(id, newTitle);
    }
  };
  return (
    <Form.Control
      key={title}
      style={styles}
      placeholder={title}
      onKeyDown={handleTitleSubmit}
      defaultValue={title}
      id={`noteTitle-${id}`}
    />
  );
}

export default NoteTitle;
