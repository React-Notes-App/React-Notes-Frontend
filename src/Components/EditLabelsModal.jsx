import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { InputGroup } from "react-bootstrap";
import EditLabelsList from "./EditLabelsList";

function EditLabelsModal() {
  const { userLabels, createLabel } = useNoteAppContext();
  console.log(userLabels, "userLabels");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 

  const createLabelStyles = {
    backgroundColor: "transparent",
    border: "none",
  };

  const handleCreateLabel = (e) => {
    const label_name = e.target.value;
    if (e.keyCode === 13) {
      createLabel(label_name);
    }
  };
 
  return (
    <div>
      <div className="d-flex" onClick={handleShow}>
        <EditOutlinedIcon />
        <Nav.Item style={{ marginLeft: ".5rem" }}>Edit Labels</Nav.Item>
      </div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Edit Labels</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-2 align-items-center">
            <EditOutlinedIcon />
            <Form.Control
              style={createLabelStyles}
              placeholder="Create Label"
              onKeyDown={handleCreateLabel}
            />
          </InputGroup>
          <hr className="horizontal-rule"/>
          {userLabels.map((label) => (
           <EditLabelsList label={label} key={label.id} />
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

export default EditLabelsModal;
