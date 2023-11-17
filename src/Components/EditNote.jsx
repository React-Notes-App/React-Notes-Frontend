import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Modal from "react-bootstrap/Modal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ItemList from "./ItemList";
import Form from "react-bootstrap/Form";
import ModalBody from "react-bootstrap/ModalBody";
import Button from "react-bootstrap/Button";
import NoteTitle from "./NoteTitle";
import AddLabelDropDown from "./AddLabelDropDown";
import LabelList from "./LabelList";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";

function EditNote({ id, title, color, items, date, labels }) {
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

  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = () => setShowEdit(true);

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

  let createdAt = moment(date).format("MMM Do YYYY");

  return (
    <div>
      <div>
        <Dropdown.Item onClick={handleEditShow}>Edit note</Dropdown.Item>
        <Modal show={showEdit} onHide={handleEditClose} centered>
          <Modal.Header
            className="border-0"
            style={{ backgroundColor: color, border: "none" }}
          >
            <Modal.Title className="border-0">
              <NoteTitle id={id} title={title} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="border-0"
            style={{ backgroundColor: color, paddingBottom: "0px" }}
          >
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
                style={{ border: "none", backgroundColor: "transparent", boxShadow: "none" }}
                placeholder="List item"
                value={newItem}
                onChange={handleNewItem}
                onKeyDown={handleItemSubmit}
              />
            </div>
            <hr className="horizontal-rule" />
          </Modal.Body>
          <ModalBody
            className="border-0"
            style={{
              backgroundColor: color,
              border: "none",
              paddingTop: "0px",
              paddingBottom: "0px",
            }}
          >
            {items
              .filter((item) => {
                return item.completed === true;
              })
              .map((item) => (
                <ItemList item={item} key={item.id} />
              ))}
          </ModalBody>
          <ModalBody
            className="border-0"
            style={{
              backgroundColor: color
            }}
          >
            <div className="d-flex flex-wrap">
              {labels?.length > 0
                ? labels.map((label) => <LabelList label={label} />)
                : null}
            </div>
            <div>
              <small className="text-muted">created{" "}{createdAt}</small>
            </div>
          </ModalBody>
          <Modal.Footer
            className="border-0 justify-content-between"
            style={{ backgroundColor: color, border: "none" }}
          >
            <AddLabelDropDown id={id} labels={labels} />
            <Button onClick={handleEditClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default EditNote;
