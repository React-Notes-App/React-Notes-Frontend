import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { FormControl, InputGroup, FormCheck, Button } from "react-bootstrap";

function AddNoteBar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteItem, setNoteItem] = useState("");

  const { addNote } = useNoteAppContext();

  const itemCharacterLimit = 200;

  const titleCharacterLimit = 20;
  const handleTitleChange = (event) => {
    if (titleCharacterLimit - event.target.value.length >= 0) {
      setNoteTitle(event.target.value);
    }
  };

  const handleItemChange = (event) => {
    if (itemCharacterLimit - event.target.value.length >= 0) {
      setNoteItem(event.target.value);
    }
  };
  const handleSaveClick = () => {
    if (noteTitle.trim().length > 0) {
      addNote(noteTitle, noteItem);
      setNoteTitle("");
      setNoteItem("");
      setOpen(false);
    } else {
      alert("Please enter a title");
    }
  };

  return (
    <div className="add-note-bar-container">
      <div className="add-note-bar" style={{ backgroundColor: "white" }}>
        <div
          className="d-flex justify-content-between align-items-center"
          onClick={handleOpen}
        >
          {open ? (
            <FormControl
              style={{
                border: "none",
                backgroundColor: "transparent",
                fontSize: "1.5rem",
                paddingLeft: "0px",
              }}
              aria-label="noteTitle"
              aria-describedby="basic-addon1"
              placeholder="Title"
              onChange={handleTitleChange}
              value={noteTitle}
            />
          ) : (
            <h5 style={{ margin: 0 }}>Take a note...</h5>
          )}
        </div>
        <div>
          {open ? (
            <div>
              <hr className="horizontal-rule" />
              <InputGroup className="mb-3 align-items-center">
                <FormCheck />
                <FormControl
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    fontSize: "1.5rem",
                  }}
                  aria-label="noteItem"
                  aria-describedby="basic-addon1"
                  placeholder="Item"
                  onChange={handleItemChange}
                  value={noteItem}
                />
              </InputGroup>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={handleClose} style={{marginLeft:".5em"}}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSaveClick} style={{marginLeft:".5em"}}>
                  Save
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AddNoteBar;
