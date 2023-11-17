import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import MoreVertOutlined from "@mui/icons-material/MoreVertOutlined";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import EditNote from "./EditNote";
import NestedAddLabelDropDown from "./NestedAddLabelDropDown";

function EditNoteDropDown({ id, title, items, color, labels }) {
  const { createCopy, deleteNote } = useNoteAppContext();
  const handleCreateCopy = () => {
    createCopy(id);
  };

  const handleDeleteNote = () => {
    deleteNote(id);
  };

  const handleSendNote = () => {
    let note = { title, items };
    let noteItems = note.items.map((item) => item.item_name);

    noteItems = noteItems.join("%0D%0A- ");

    const link = `mailto:?subject=${title}&body=- ${noteItems}`;
    window.open(link);
  };

  const handleShareNote = () => {
    let note = { title, items };
    let noteTitle = note.title;
    let noteItems = note.items.map((item) => item.item_name);

    noteItems = noteItems.join("\n - ")
    console.log(noteItems);

    let copiedNote = `${noteTitle}\n - ${noteItems}`;
    console.log(copiedNote);

    navigator.clipboard.writeText(copiedNote);
  };

  let style = {
    color: "black",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    padding: "0",
  };

  return (
    <Dropdown autoClose="outside">
      <Dropdown.Toggle style={style}>
        <MoreVertOutlined />
      </Dropdown.Toggle>
      <DropdownMenu>
        <Dropdown.Item onClick={handleDeleteNote}>Delete note</Dropdown.Item>
        <EditNote
          id={id}
          title={title}
          items={items}
          color={color}
          labels={labels}
        />

        <NestedAddLabelDropDown id={id} labels={labels} />

        <Dropdown.Item onClick={handleCreateCopy}>Make a copy</Dropdown.Item>
        <Dropdown.Item onClick={handleSendNote}>Send</Dropdown.Item>
        <Dropdown.Item onClick={handleShareNote}>
          Save to clipboard
        </Dropdown.Item>
      </DropdownMenu>
    </Dropdown>
  );
}

export default EditNoteDropDown;
