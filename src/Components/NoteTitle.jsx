import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Form from "react-bootstrap/Form";

function NoteTitle({id, title}) {
  const { editNoteTitle } = useNoteAppContext();

  const [newTitle, setNewTitle] = useState("");

  const handleNewTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleSubmit = (e) => {
    if (e.keyCode === 13 && newTitle.trim().length > 0) {
      e.preventDefault();
      editNoteTitle(id, newTitle);
    }
  };
  return (
    <Form.Control
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "1.5rem",
      }}
      placeholder={title}
      value={newTitle}
      onChange={handleNewTitle}
      onKeyDown={handleTitleSubmit}
    />
  );
}

export default NoteTitle;
