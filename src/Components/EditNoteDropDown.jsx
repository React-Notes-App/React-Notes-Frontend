import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { EditNote, ColorPalette } from "./";
import { MoreVertOutlined } from "@mui/icons-material";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

function EditNoteDropDown({ id, title, items, color, labels }) {
    const [show, setShow] = useState(false);
    
  return (
    <div>
      <MoreVertOutlined onClick={() => setShow((previousShow) => !previousShow)} />
      <Dropdown show={show}>
        {/* <Dropdown.Toggle id="dropdown-basic">
          <MoreVertOutlined />
        </Dropdown.Toggle> */}
        <DropdownMenu>
          <EditNote
            id={id}
            title={title}
            items={items}
            color={color}
            labels={labels}
          />
          <ColorPalette id={id} color={color} />
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default EditNoteDropDown;
