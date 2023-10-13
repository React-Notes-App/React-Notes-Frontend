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
      item_name: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
   
  };

  const { deleteItem, editItem, checkItem } = useNoteAppContext();
  const [editedItem, setEditedItem] = useState("");
  const [itemId, setItemId] = useState("");


  const styles = {
    textDecoration: item.completed ? "line-through" : "none",
    backgroundColor: "transparent",
    border: "none",
  };

  const handleCheck = () => {
    checkItem(item.id,);
  };

  const handleEditItem = (e) => {
    setEditedItem(e.target.value);
  };
  const handleEditItemSubmit = (e) => {
    const id = itemId;
    if (e.keyCode === 13 && editedItem.trim().length > 0) {
      e.preventDefault();
      editItem(editedItem, id);
    }
  };
  function handleDeleteItemClick() {
    const id = itemId;
    deleteItem(id);
  }
  return (
    <div
      key={item.id}
      onMouseEnter={() => setItemId(item.id)}
    >
      <InputGroup className="mb-3 align-items-center">
        <Form.Check
          type="checkbox"
          id="customControlInline"
          value={item.completed}
          onChange={handleCheck}
        />
        <Form.Control
          style={styles}
          placeholder={item.item_name}
          value={editedItem}
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
