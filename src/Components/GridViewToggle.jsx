import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import GridViewIcon from "@mui/icons-material/GridView";
import { OverlayTrigger, Tooltip } from "react-bootstrap";


function GridViewToggle() {
    const { setColumnView } = useNoteAppContext();
    const handleGridView = () => {
        setColumnView(false);
    }
  return (
    <div onClick={handleGridView}>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>Grid View</Tooltip>}>
      <GridViewIcon />
      </OverlayTrigger>
    </div>
  );
}

export default GridViewToggle;
