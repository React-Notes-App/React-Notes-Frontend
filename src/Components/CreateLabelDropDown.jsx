import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { Dropdown } from "react-bootstrap";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import CreateLabel from "./CreateLabel";

function CreateLabelDropDown({ setLabelId, setLabel_Name }) {
  const { userLabels } = useNoteAppContext();

  const dropDownStyles = {
    paddingLeft: ".5rem",
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Add Label
      </Dropdown.Toggle>
      <Dropdown.Menu style={dropDownStyles}>
        <CreateLabel setLabel_Name={setLabel_Name} />
        <hr className="horizontal-rule"/>
        {userLabels.map((label) => (
          <div key={label.id} className="d-flex align-items-center">
            <LabelOutlinedIcon />
            <Dropdown.Item
              key={label.id}
              as="button"
              value={label.id}
              onClick={(e) => setLabelId(e.target.value)}
            >
              {label.label_name}
            </Dropdown.Item>
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CreateLabelDropDown;
