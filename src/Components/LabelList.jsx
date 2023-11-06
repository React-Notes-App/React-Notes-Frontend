import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function LabelList({ label }) {
  const { removeLabelFromNote, userLabels } = useNoteAppContext();
  const labelId = label.id;
  const handleRemoveLabel = () => {
    const noteId = label.notes_id;
    removeLabelFromNote(labelId, noteId);
  };
const foo = userLabels.map((label) => {
if (label.id === labelId) {
  return label.label_name
}
return null
})
  return (
    <div
      className="d-flex align-items-center"
      style={{ marginBottom: ".5rem" }}
      key={label.id}
    >
      <small className="note-label">{foo}</small>
      <HighlightOffIcon
        className="label-delete-icon"
        style={{ marginLeft: ".5rem" }}
        label={label}
        onClick={handleRemoveLabel}
      />
    </div>
  );
}

export default LabelList;
