import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { FormControl, InputGroup } from "react-bootstrap";

function AddNote() {
  const { createNote } = useNoteAppContext();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [noteTitle, setNoteTitle] = useState("");
  const [noteItem, setNoteItem] = useState("");
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
      createNote(noteTitle)
      setNoteTitle("");
    } else {
      alert("Please enter a title");
    }
  };

  return (
    <div>
      <AddBoxIcon sx={{ fontSize: 60 }} className="me-2" onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
          <InputGroup className="mb-3">
            <FormControl
             style={{
              border: "none",
              backgroundColor: "transparent",
              fontSize: "1.5rem"}}
              aria-label="noteTitle"
              aria-describedby="basic-addon1"
              placeholder="Title"
              onChange={handleTitleChange}
              value={noteTitle}
            />
          </InputGroup>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
             style={{
              border: "none",
              backgroundColor: "transparent",
              fontSize: "1.5rem",}}
              aria-label="noteItem"
              aria-describedby="basic-addon1"
              placeholder="Item"
              onChange={handleItemChange}
              value={noteItem}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <div
        className="modal fade"
        id="newNoteModal"
        tabIndex="-1"
        aria-labelledby="newNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="newNoteModalLabel">
                Create a New Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                rows="1"
                cols="55"
                placeholder="Title"
                onChange={handleTitleChange}
                value={noteTitle}
                id="noteTitle"
              ></textarea>
              <hr className="border border-1 opacity-50"></hr>
              <textarea
                rows="10"
                cols="55"
                placeholder="Type to add a note..."
                onChange={handleTextChange}
                value={noteText}
                id="noteText"
              ></textarea>
            </div>
            <div className="modal-footer justify-content-between">
              <small>{textCharacterLimit - noteText.length}</small>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveClick}
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default AddNote;
