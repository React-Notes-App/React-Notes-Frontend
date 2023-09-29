import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { useState } from "react";
import PropTypes from "prop-types";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function ItemList({ todoItem, }) {
  ItemList.propTypes = {
    todoItem: PropTypes.shape({
      id: PropTypes.string.isRequired,
      item: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
   
  };

  const { deleteTodoItem, editTodoItem, checkTodoItem } = useNoteAppContext();
  const [editedTodoItem, setEditedTodoItem] = useState("");
  const [todoItemId, setTodoItemId] = useState("");


  const styles = {
    textDecoration: todoItem.completed ? "line-through" : "none",
    backgroundColor: "transparent",
    border: "none",
  };

  const handleCheck = () => {
    checkTodoItem(todoItem.id,);
  };

  const handleEditItem = (e) => {
    setEditedTodoItem(e.target.value);
  };
  const handleEditItemSubmit = (e) => {
    const id = todoItemId;
    if (e.keyCode === 13 && editedTodoItem.trim().length > 0) {
      e.preventDefault();
      editTodoItem(editedTodoItem, id);
      setEditedTodoItem("");
    }
  };
  function handleDeleteItemClick() {
    const id = todoItemId;
    deleteTodoItem(id);
  }
  return (
    <div
      key={todoItem.id}
      onMouseEnter={() => setTodoItemId(todoItem.id)}
    >
      <InputGroup className="mb-3 align-items-center">
        <Form.Check
          type="checkbox"
          id="customControlInline"
          value={todoItem.completed}
          onChange={handleCheck}
        />
        <Form.Control
          style={styles}
          placeholder={todoItem.item}
          value={editedTodoItem}
          onChange={handleEditItem}
          onKeyDown={handleEditItemSubmit}
        ></Form.Control>

        <HighlightOffIcon
          className="deleteIcon"
          onClick={handleDeleteItemClick}
        />
      </InputGroup>
    </div>
  );
}

export default ItemList;
