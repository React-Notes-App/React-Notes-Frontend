import React from "react";
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Dropdown } from "react-bootstrap";
import { useNoteAppContext } from "../Provider/NoteAppProvider";

function AddLabelDropDown({ labels, id }) {
  const { userLabels, addLabelToNote } = useNoteAppContext();
  const noteId = id;
  const handleAddLabel = (e) => {
    const labelId = e.target.value;
    addLabelToNote(labelId, noteId);
  };

  let labelCheck = labels.map((label) => label.label_name);

  return (
    <div>
      {/* <MoreVertIcon /> */}
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Add Label
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {userLabels.map((label) =>
            labelCheck.includes(label.label_name) ? null : (
              <Dropdown.Item
                key={label.id}
                as="button"
                value={label.id}
                onClick={handleAddLabel}
              >
                {label.label_name}
              </Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default AddLabelDropDown;
