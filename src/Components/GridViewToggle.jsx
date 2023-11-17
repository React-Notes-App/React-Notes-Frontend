import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import GridViewIcon from "@mui/icons-material/GridView";


function GridViewToggle() {
    const { setColumnView } = useNoteAppContext();
    const handleGridView = () => {
        console.log("Grid View");
        setColumnView(false);
    }
  return (
    <div onClick={handleGridView}>
      <GridViewIcon />
      <label style={{marginLeft: ".5em"}}>Grid View</label>
    </div>
  );
}

export default GridViewToggle;
