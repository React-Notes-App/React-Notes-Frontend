import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

function EditLabels() {
  const { userLabels, editLabel, createLabel } = useNoteAppContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCreateLabel = (e) => {
    const label_name = e.target.value;
    if (e.keyCode === 13) {
      createLabel(label_name);
    }
  };
  const handleEditLabel = (e) => {
    const labelId = parseInt(e.target.id);
    const label_name = e.target.value;
    if (e.keyCode === 13) {
      editLabel(labelId, label_name);
    }
  };
  return (
    <div>
      <div className="d-flex" onClick={handleShow}>
        <EditOutlinedIcon />
        <Nav.Item>Edit Labels</Nav.Item>
      </div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Edit Labels</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="Create Label"
            onKeyDown={handleCreateLabel}
          />
          {userLabels.map((label) => (
            <Form.Control
              key={label.label_name}
              id={label.id}
              placeholder={label.label_name}
              onKeyDown={handleEditLabel}
              defaultValue={label.label_name}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditLabels;
