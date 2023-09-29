import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import GridViewIcon from "@mui/icons-material/GridView";

function GridViewToggle() {
    const { setGridView } = useNoteAppContext();
    const handleGridView = () => {
        console.log("Grid View");
        setGridView(false);
    }
  return (
    <div>
      <GridViewIcon onClick={handleGridView}/>
    </div>
  );
}

export default GridViewToggle;
