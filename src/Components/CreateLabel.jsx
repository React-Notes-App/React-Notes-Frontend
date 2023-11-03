import React from "react";
import Form from "react-bootstrap/Form";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import InputGroup from "react-bootstrap/InputGroup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function CreateLabel() {
  const { setLabelValue } = useNoteAppContext;
  const createLabelStyles = {
    backgroundColor: "transparent",
    border: "none",
  };
  // const handleCreateLabel = (e) => {
  //     const label_name = e.target.value;
  //     if (e.keyCode === 13) {
  //       setLabelValue(label_name);
  //     }
  //   }
  return (
    <InputGroup className="mb-2 align-items-center">
      <EditOutlinedIcon />
      <Form.Control
        style={createLabelStyles}
        placeholder="Create Label"
        value={setLabelValue}
        onChange={(e) => setLabelValue(e.target.value)}
        // onKeyDown={(e) => setLabelValue(e.target.value)}
      />
    </InputGroup>
  );
}

export default CreateLabel;
