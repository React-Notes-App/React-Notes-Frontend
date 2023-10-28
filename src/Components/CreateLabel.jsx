import React from "react";
import Form from "react-bootstrap/Form";
import { useNoteAppContext } from "../Provider/NoteAppProvider";

function CreateLabel() {
  const { createLabel } = useNoteAppContext;

  const handleCreateLabel = (e) => {
    const label_name = e.target.value;
    if (e.keyCode === 13) {
      createLabel(label_name);
    }
  };

  return (
    <div>
     
        <Form.Control
          placeholder="Create Label"
          onKeyDown={handleCreateLabel}
        />
    
    </div>
  );
}

export default CreateLabel;
