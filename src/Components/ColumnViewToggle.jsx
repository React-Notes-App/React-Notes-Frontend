import React from "react";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function ColumnViewToggle() {
  const { setColumnView } = useNoteAppContext();
  const handleColumnView = () => {
    setColumnView(true);
  };
  return (
    <div onClick={handleColumnView}>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>Column View</Tooltip>}>
      <ViewAgendaOutlinedIcon />
      </OverlayTrigger>
    </div>
  );
}

export default ColumnViewToggle;
