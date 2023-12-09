import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { FormControl, InputGroup, FormCheck, Button } from "react-bootstrap";
import CreateLabelDropDown from "./CreateLabelDropDown";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function AddNoteBar({ param_id, param_name, param_is_archived }) {
 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteItem, setNoteItem] = useState("");
  const [labelId, setLabelId] = useState("");
  const [label_name, setLabel_Name] = useState("");
  const [labelPreview, setLabelPreview] = useState("");

  const { createNote } = useNoteAppContext();

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
      createNote(noteTitle, noteItem, label_name, labelId, param_is_archived);
      setNoteTitle("");
      setNoteItem("");
      setLabelId("");
      setLabelPreview("");
      setOpen(false);
    } else {
      alert("Please enter a title");
    }
  };

  const clearLabelPreview = () => {
    setLabelPreview("");
    setLabelId("");
    setLabel_Name("");
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
                fontSize: "1rem",
                paddingLeft: "0px",
                focus: "none",
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
              <InputGroup className="mb-3 align-items-center">
                <FormCheck />
                <FormControl
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    fontSize: "1rem",
                  }}
                  aria-label="noteItem"
                  aria-describedby="basic-addon1"
                  placeholder="Item"
                  onChange={handleItemChange}
                  value={noteItem}
                />
              </InputGroup>
              <hr className="horizontal-rule" />
              {labelPreview ? (
                <div
                  className="d-flex align-items-center"
                  style={{ marginBottom: "1rem", marginTop: "1rem" }}
                >
                  <small className="note-label">{labelPreview}</small>
                  <HighlightOffIcon
                    className="label-delete-icon"
                    style={{ marginLeft: ".5rem", marginRight: ".5rem" }}
                    label={labelPreview}
                    onClick={clearLabelPreview}
                  />
                </div>
              ) : null}
              <div className="d-flex justify-content-between">
                <CreateLabelDropDown
                  label_name={label_name}
                  setLabel_Name={setLabel_Name}
                  labelId={labelId}
                  param_id={param_id}
                  param_name={param_name}
                  setLabelId={setLabelId}
                  setLabelPreview={setLabelPreview}
                />
                <div>
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    style={{ marginLeft: ".5em" }}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSaveClick}
                    style={{ marginLeft: ".5em" }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AddNoteBar;
