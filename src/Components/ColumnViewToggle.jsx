import React from "react";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import { useNoteAppContext } from "../Provider/NoteAppProvider";

function ColumnViewToggle() {
    const { setGridView } = useNoteAppContext();
    const handleColumnView = () => {
        console.log("Column View");
        setGridView(true);
    }
  return (
    <div>
      <ViewAgendaOutlinedIcon onClick={handleColumnView}/>
    </div>
  );
}

export default ColumnViewToggle;
