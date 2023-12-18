import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNoteAppContext } from "../Provider/NoteAppProvider";

function CreateLabel({ setLabel_Name, setLabelPreview }) {

  const {userLabels} = useNoteAppContext();

  const createLabelStyles = {
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
  };
  const existingLabels = userLabels.map((label) => label.label_name);
  console.log(userLabels);
 
  

  const handleCreateLabel = (e) => {
    if (e.keyCode === 13 && !existingLabels.includes(e.target.value)) {
      setLabel_Name(e.target.value);
      setLabelPreview(e.target.value);
      setLabel_Name("");
    }

    if (e.keyCode === 13 && existingLabels.includes(e.target.value)) {
      alert("Label already exists");
    }

  };
  return (
    <InputGroup className="mb-2 align-items-center">
      <EditOutlinedIcon />
      <Form.Control
        style={createLabelStyles}
        placeholder="Create Label"
        onKeyDown={handleCreateLabel}
      />
    </InputGroup>
  );
}

export default CreateLabel;
