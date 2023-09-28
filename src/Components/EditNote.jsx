import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Modal from "react-bootstrap/Modal";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ItemList from "./ItemList";
import Form from "react-bootstrap/Form";
import  ModalBody  from "react-bootstrap/ModalBody";


function EditNote({ id, title, color, todoItems }) {
  EditNote.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    todoItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        item: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ).isRequired,
  };

  const { editNoteTitle, addTodoItem } = useNoteAppContext();

  const [newTitle, setNewTitle] = useState("");
  const [newTodoItem, setNewTodoItem] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNewItem = (e) => {
    setNewTodoItem(e.target.value);
  };

  const handleNewTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleSubmit = (e) => {
    if (e.keyCode === 13 && newTitle.trim().length > 0) {
      e.preventDefault();
      editNoteTitle(newTitle, id);
      setNewTitle("");
    }
  };
  const handleItemSubmit = (e) => {
    if (e.keyCode === 13 && newTodoItem.trim().length > 0) {
      e.preventDefault();
      addTodoItem(newTodoItem, id);
      setNewTodoItem("");
    }
  };

  return (
    <div>
      <div>
        <EditNoteIcon fontSize="large" className="me-2" onClick={handleShow} />
      

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header
            closeButton
            style={{ backgroundColor: color, border: "none" }}
          >
            <Modal.Title>
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
            </Modal.Title>
            

          </Modal.Header>
          <Modal.Body style={{ backgroundColor: color }}>
            {todoItems
              .filter((todoItem) => {
                return todoItem.completed === false;
              })
              .map((todoItem) => (
                <ItemList todoItem={todoItem} key={todoItem.id} />
              ))}

            <hr className="horizontal-rule" />
            <div className="d-flex flex-row align-items-center">
            
              <AddCircleOutlineIcon />
              <Form.Control
                style={{ border: "none", backgroundColor: "transparent" }}
                placeholder="List item"
                value={newTodoItem}
                onChange={handleNewItem}
                onKeyDown={handleItemSubmit}
              />
            </div>
            <hr className="horizontal-rule" />
          </Modal.Body>

          <ModalBody style={{ backgroundColor: color, border: "none" }}>
            {todoItems
              .filter((todoItem) => {
                return todoItem.completed === true;
              })
              .map((todoItem) => (
                <ItemList todoItem={todoItem} key={todoItem.id} />
              ))}
          </ModalBody>
          <Modal.Footer
            style={{ backgroundColor: color, border: "none" }}
          ></Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default EditNote;
