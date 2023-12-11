import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import MoreVertOutlined from "@mui/icons-material/MoreVertOutlined";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import EditNote from "./EditNote";
import NestedAddLabelDropDown from "./NestedAddLabelDropDown";

function EditNoteDropDown({ id, title, items, color, labels, has_checklist }) {
  const { createCopy, deleteNotePerm, hideCheckBoxes, showCheckBoxes } =
    useNoteAppContext();
  const handleCreateCopy = () => {
    createCopy(id);
  };

  const handleDeleteNote = () => {
    deleteNotePerm(id);
  };

  const handleHideCheckboxes = () => {
    hideCheckBoxes(id);
  };

  const handleShowCheckboxes = () => {
    showCheckBoxes(id);
  };

  const handleSendNote = () => {
    let note = { title, items };
    let completedNoteItems = note.items.filter(
      (item) => item.completed === true
    );
    let unCompletedNoteItems = note.items.filter(
      (item) => item.completed === false
    );

    let openNoteItems = unCompletedNoteItems.map((item) => item.item_name);
    let finishedNoteItems = completedNoteItems.map((item) => item.item_name);

    let noteItems = openNoteItems.join("%0D%0A- ");
    let finishedItems = finishedNoteItems.join("%0D%0A- (\u2713)");

    let link = `mailto:?subject=${note.title}&body=- ${noteItems} %0D%0A%0D%0A- (\u2713)${finishedItems}`;
    window.open(link);
  };

  const handleShareNote = () => {
    let note = { title, items };
    let noteTitle = note.title;
    let completedNoteItems = note.items.filter(
      (item) => item.completed === true
    );
    let unCompletedNoteItems = note.items.filter(
      (item) => item.completed === false
    );

    let openNoteItems = unCompletedNoteItems.map((item) => item.item_name);
    let finishedNoteItems = completedNoteItems.map((item) => item.item_name);

    let noteItems = openNoteItems.join("\n - ");
    let finishedItems = finishedNoteItems.join("\n - (\u2713)");

    let copiedNote = `${noteTitle}\n - ${noteItems}\n\n - (\u2713)${finishedItems}\n`;

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
      <DropdownMenu id="dropdown-menu">
        <EditNote
          id={id}
          title={title}
          items={items}
          color={color}
          labels={labels}
          has_checklist={has_checklist}
        />

        <NestedAddLabelDropDown id={id} labels={labels} />
        {has_checklist === true ? (
          <Dropdown.Item onClick={handleHideCheckboxes}>
            Hide checkboxes
          </Dropdown.Item>
        ) : (
          <Dropdown.Item onClick={handleShowCheckboxes}>
            {" "}
            Show checkboxes
          </Dropdown.Item>
        )}
        <Dropdown.Divider />

        <Dropdown.Item onClick={handleCreateCopy}>Make a copy</Dropdown.Item>
        <Dropdown.Item onClick={handleSendNote}>Send</Dropdown.Item>
        <Dropdown.Item onClick={handleShareNote}>
          Save to clipboard
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item style={{color: "red"}}onClick={handleDeleteNote}>Delete Forever</Dropdown.Item>
      </DropdownMenu>
    </Dropdown>
  );
}

export default EditNoteDropDown;
