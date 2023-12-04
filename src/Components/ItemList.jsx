import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { useState } from "react";
import PropTypes from "prop-types";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function ItemList({ item, has_checklist }) {
  ItemList.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      notes_id: PropTypes.number.isRequired,
      item_name: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  };

  const { deleteItem, editItemName, checkItem, createItem } =
    useNoteAppContext();
  const [completed, setCompleted] = useState(item.completed);
  const noteId = item.notes_id;

  const styles = {
    textDecoration: item.completed ? "line-through" : "none",
    backgroundColor: "transparent",
    border: "none",
    fontSize: ".8rem",
    boxShadow: "none",
  };

  const handleCheck = () => {
    const id = item.id;
    setCompleted(!completed);
    checkItem(id, !completed, noteId);
  };

  const handleEditItemSubmit = (e) => {
    const itemName = "";
    const id = item.id;
    const editedItem = e.target.value;
    if (e.keyCode === 13 && editedItem.trim().length > 0) {
      editItemName(id, editedItem, noteId);
      console.log("edit item", e.target.value);
    }
    
    if (e.keyCode === 13 && e.target.value === item.item_name) {
      createItem(noteId, itemName);
      console.log("blank item", e.target.value);
    }
  };

  function handleDeleteItemClick() {
    const id = item.id;
    deleteItem(id, noteId);
  }

  return (
    <div key={item.id}>
      <InputGroup className="mb-0 align-items-center">
        {has_checklist === true ? (
          <Form.Check
            type="checkbox"
            id="itemCheckbox"
            value={completed}
            onChange={handleCheck}
            checked={completed}
          />
        ) : null}
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
