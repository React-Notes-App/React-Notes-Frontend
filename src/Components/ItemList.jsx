import React, { useLayoutEffect } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { useState, useRef } from "react";
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

  const textAreaStyle = {
    textDecoration: item.completed ? "line-through" : "none",
    backgroundColor: "transparent",
    border: "none",
    fontSize: ".8rem",
    boxShadow: "none",
    wordWrap: "break-word",
    whiteSpace: "initial",
    resize: "none",
    paddingTop: "0",
  };

  const textAreaRef = useRef(null);

  useLayoutEffect(() => {
    textAreaRef.current.style.height = "inherit";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [item.item_name]);

  const handleCheck = () => {
    const id = item.id;
    setCompleted(!completed);
    checkItem(id, !completed, noteId);
  };

  const handleItem = (e) => {
    const id = item.id;
    const editedItem = e.target.value;
    const itemName = "";
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;

    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      editItemName(id, editedItem, noteId);
    }

    if (e.keyCode === 13 && !e.shiftKey && e.target.value === item.item_name) {
      e.preventDefault();
      createItem(noteId, itemName);
    }
  };


  const handleResizeTextArea = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  function handleDeleteItemClick() {
    const id = item.id;
    deleteItem(id, noteId);
  }

  return (
    <div>
      <div key={item.id}>
        <InputGroup className="mb-0 align-items-top">
          {has_checklist === true ? (
            <Form.Check
              type="checkbox"
              id={`itemCheckbox-${item.id}`}
              value={completed}
              onChange={handleCheck}
              checked={completed}
            />
          ) : null}
          <Form.Control
            ref={textAreaRef}
            as={"textarea"}
            rows={1}
            key={item.item_name}
            style={textAreaStyle}
            placeholder={"Add Item"}
            onKeyDown={handleItem}
            onChange={handleResizeTextArea}
            onFocus={(e) => {
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              );
            }}
            defaultValue={item.item_name}
            id={`item-${item.id}`}
            autoFocus
          ></Form.Control>

          <HighlightOffIcon
            className="deleteIcon"
            onClick={handleDeleteItemClick}
          />
        </InputGroup>
      </div>
    </div>
  );
}

export default ItemList;
