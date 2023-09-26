import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Dropdown } from "react-bootstrap";

function NoteDropDown() {
  return (
    <div>
      NoteDropDown
       <MoreVertIcon />
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default NoteDropDown;
