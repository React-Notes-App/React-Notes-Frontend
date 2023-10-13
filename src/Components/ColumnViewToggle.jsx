import React from "react";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import { useNoteAppContext } from "../Provider/NoteAppProvider";

function ColumnViewToggle() {
  const { setColumnView } = useNoteAppContext();
  const handleColumnView = () => {
    console.log("Column View");
    setColumnView(true);
  };
  return <ViewAgendaOutlinedIcon  onClick={handleColumnView} />;
}

export default ColumnViewToggle;
