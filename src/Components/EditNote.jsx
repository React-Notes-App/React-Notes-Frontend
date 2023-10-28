import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Modal from "react-bootstrap/Modal";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ItemList from "./ItemList";
import Form from "react-bootstrap/Form";
import ModalBody from "react-bootstrap/ModalBody";
import Button from "react-bootstrap/Button";
import NoteTitle from "./NoteTitle";
import AddLabelDropDown from "./AddLabelDropDown";

function EditNote({ id, title, color, items, labels }) {
  EditNote.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        item_name: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ).isRequired,
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        labels_id: PropTypes.number.isRequired,
        label_name: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  const { createItem } = useNoteAppContext();

  const [newItem, setNewItem] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNewItem = (e) => {
    setNewItem(e.target.value);
  };

  const handleItemSubmit = (e) => {
    if (e.keyCode === 13 && newItem.trim().length > 0) {
      e.preventDefault();
      createItem(id, newItem);
      setNewItem("");
    }
  };



  return (
    <div>
      <div>
        <EditNoteIcon fontSize="large" className="me-2" onClick={handleShow} />
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header
            className="border-0"
            style={{ backgroundColor: color, border: "none" }}
          >
            <Modal.Title className="border-0">
              <NoteTitle id={id} title={title} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="border-0" style={{ backgroundColor: color }}>
            {items
              .filter((item) => {
                return item.completed === false;
              })
              .map((item) => (
                <ItemList item={item} key={item.id} />
              ))}

            <hr className="horizontal-rule" />
            <div className="d-flex flex-row align-items-center">
              <AddCircleOutlineIcon />
              <Form.Control
                style={{ border: "none", backgroundColor: "transparent" }}
                placeholder="List item"
                value={newItem}
                onChange={handleNewItem}
                onKeyDown={handleItemSubmit}
              />
            </div>
            <hr className="horizontal-rule" />
          </Modal.Body>

          <ModalBody className="border-0" style={{ backgroundColor: color, border: "none" }}>
            {items
              .filter((item) => {
                return item.completed === true;
              })
              .map((item) => (
                <ItemList item={item} key={item.id} />
              ))}
          </ModalBody>
          <Modal.Footer className="border-0 justify-content-between" style={{ backgroundColor: color, border: "none" }}>
          <AddLabelDropDown id={id} labels={labels} />
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default EditNote;
