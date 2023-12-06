import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import GridViewIcon from "@mui/icons-material/GridView";


function GridViewToggle() {
    const { setColumnView } = useNoteAppContext();
    const handleGridView = () => {
        setColumnView(false);
    }
  return (
    <div onClick={handleGridView}>
      <GridViewIcon />
    </div>
  );
}

export default GridViewToggle;
