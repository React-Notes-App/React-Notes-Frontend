import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";

function AddLabelDropDown({ labels, id }) {

  const { userLabels, addLabelToNote, createLabel } = useNoteAppContext();
  
  const noteId = id;
  const handleAddLabel = (e) => {
    const labelId = e.target.value;
    addLabelToNote(labelId, noteId);
  };
  
  const handleCreateLabel = (e) => {
    const label_name = e.target.value;
    if (e.keyCode === 13) {
      createLabel(label_name);
    }
  };

  let labelCheck = labels.map((label) => label.label_name);

  const createLabelStyles = {
    backgroundColor: "transparent",
    border: "none",
  };

  const dropDownStyles = {
    paddingLeft: ".5rem",
  };


  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Add Label
        </Dropdown.Toggle>
        <Dropdown.Menu style={dropDownStyles} >
          <InputGroup className="mb-2 align-items-center">
            <EditOutlinedIcon />
            <Form.Control
              style={createLabelStyles}
              placeholder="Create Label"
              onKeyDown={handleCreateLabel}
            />
          </InputGroup>
          <hr className="horizontal-rule"/>
          {userLabels.map((label) =>
            labelCheck.includes(label.label_name) ? null : (
              <div key={label.id} className="d-flex align-items-center">
                <LabelOutlinedIcon />
                <Dropdown.Item
                  key={label.id}
                  as="button"
                  value={label.id}
                  onClick={handleAddLabel}
                >
                  {label.label_name}
                </Dropdown.Item>
              </div>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default AddLabelDropDown;
