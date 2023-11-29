import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { Dropdown } from "react-bootstrap";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import CreateLabel from "./CreateLabel";

function CreateLabelDropDown({ setLabelId, setLabel_Name, setLabelPreview }) {
  const { userLabels } = useNoteAppContext();

  const dropDownStyles = {
    paddingLeft: ".5rem",
  };

  const handleLabelSet = (e) => {
    setLabelId(e.target.value);
    setLabelPreview(e.target.name)
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Add Label
      </Dropdown.Toggle>
      <Dropdown.Menu id="dropdown-menu" style={dropDownStyles}>
        <CreateLabel setLabel_Name={setLabel_Name} setLabelPreview={setLabelPreview} />
        <hr className="horizontal-rule"/>
        {userLabels.map((label) => (
          <div key={label.id} className="d-flex align-items-center">
            <LabelOutlinedIcon />
            <Dropdown.Item
              key={label.id}
              as="button"
              value={label.id}
              onClick={handleLabelSet}
              name={label.label_name}
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
