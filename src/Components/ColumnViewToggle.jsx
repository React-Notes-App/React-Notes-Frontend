import React from "react";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import { useNoteAppContext } from "../Provider/NoteAppProvider";

function ColumnViewToggle() {
  const { setColumnView } = useNoteAppContext();
  const handleColumnView = () => {
    setColumnView(true);
  };
  return (
    <div onClick={handleColumnView}>
      <ViewAgendaOutlinedIcon />
    </div>
  );
}

export default ColumnViewToggle;
