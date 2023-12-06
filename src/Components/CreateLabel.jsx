import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function CreateLabel({ setLabel_Name, setLabelPreview }) {
  const createLabelStyles = {
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
  };
  const handleCreateLabel = (e) => {
    if (e.keyCode === 13) {
      setLabel_Name(e.target.value);
      setLabelPreview(e.target.value);
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
