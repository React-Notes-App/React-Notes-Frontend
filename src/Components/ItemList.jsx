import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { useState } from "react";
import PropTypes from "prop-types";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function ItemList({ item }) {
  ItemList.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      notes_id: PropTypes.number.isRequired,
      item_name: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  };

  const { deleteItem, editItemName, checkItem } = useNoteAppContext();
  const [completed, setCompleted] = useState(item.completed);
  const noteId = item.notes_id;

  const styles = {
    textDecoration: item.completed ? "line-through" : "none",
    backgroundColor: "transparent",
    border: "none",
  };

  const handleCheck = () => {
    const id = item.id;
    setCompleted(!completed);
    checkItem(id, !completed, noteId);
  };



  const handleEditItemSubmit = (e) => {
    const id = item.id;
    const editedItem = e.target.value;
    if (e.keyCode === 13 && editedItem.trim().length > 0) {
      editItemName(id, editedItem, noteId);
    }
  };
  function handleDeleteItemClick() {
    const id = item.id;
    deleteItem(id, noteId);
  }
  return (
    <div key={item.id}>
      <InputGroup className="mb-3 align-items-center">
        <Form.Check
          type="checkbox"
          id="customControlInline"
          value={completed}
          onChange={handleCheck}
        />
        <Form.Control
        key={item.item_name}
          style={styles}
          placeholder={item.item_name}
          onKeyDown={handleEditItemSubmit}
          defaultValue={item.item_name}
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
