import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import {
  FormControl,
  InputGroup,
  FormCheck,
  Button,
  Dropdown,
  Form,
} from "react-bootstrap";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CreateLabelDropDown from "./CreateLabelDropDown";

function AddNoteBar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteItem, setNoteItem] = useState("");
  // const [labelId, setLabelId] = useState("");
  // const [label_name, setLabel_Name] = useState("");

  const { createNote, userLabels, label_name, labelId} = useNoteAppContext();

  const createLabelStyles = {
    backgroundColor: "transparent",
    border: "none",
  };
  const dropDownStyles = {
    paddingLeft: ".5rem",
  };

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
      console.log(label_name, "labelValue");
      createNote(noteTitle, noteItem, label_name, labelId);
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
                fontSize: "1rem",
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
                    fontSize: "1rem",
                  }}
                  aria-label="noteItem"
                  aria-describedby="basic-addon1"
                  placeholder="Item"
                  onChange={handleItemChange}
                  value={noteItem}
                />
              </InputGroup>
              <div className="d-flex justify-content-between">
                <CreateLabelDropDown/>
                {/* <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Add Label
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={dropDownStyles}>
                    <InputGroup className="mb-2 align-items-center">
                      <EditOutlinedIcon />
                      <Form.Control
                        style={createLabelStyles}
                        placeholder="Create Label"
                        onChange={(e) => setLabel_Name(e.target.value)}
                      />
                    </InputGroup>
                    {userLabels.map((label) => (
                      <div key={label.id} className="d-flex align-items-center">
                        <LabelOutlinedIcon />
                        <Dropdown.Item
                          as="button"
                          value={label.id}
                          onClick={(e) => setLabelId(e.target.value)}
                        >
                          {label.label_name}
                        </Dropdown.Item>
                      </div>
                    ))}
                  </Dropdown.Menu>
                </Dropdown> */}
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
