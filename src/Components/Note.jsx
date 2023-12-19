import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import {
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import PropTypes from "prop-types";
import ColorPalette from "./ColorPalette";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import ItemList from "./ItemList";
import NoteTitle from "./NoteTitle";
import LabelList from "./LabelList";
import EditNoteDropDown from "./EditNoteDropDown";

function Note({
  id,
  title,
  items,
  date,
  color,
  labels,
  is_archived,
  has_checklist,
  is_deleted,
}) {
  Note.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        notes_id: PropTypes.number.isRequired,
        item_name: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      }).isRequired
    ).isRequired,
    date: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        notes_id: PropTypes.number.isRequired,
        labels_id: PropTypes.number.isRequired,
        label_name: PropTypes.string.isRequired,
      })
    ).isRequired,
    is_archived: PropTypes.bool.isRequired,
    has_checklist: PropTypes.bool.isRequired,
    is_deleted: PropTypes.bool.isRequired,
  };

  const { trashNote, removeFromTrash, archiveNote, unarchiveNote, createItem } =
    useNoteAppContext();
  const noteId = id;

  const handleCreateItem = (e) => {
    const itemName = e.target.value;
    if (e.keyCode === 13 && itemName.trim().length > 0) {
      createItem(noteId, itemName);
    }
  };

  const handleTrashNoteClick = () => {
    trashNote(noteId);
  };

  const handleRemoveFromTrashClick = () => {
    removeFromTrash(noteId);
  };

  const handleArchiveNoteClick = () => {
    archiveNote(noteId);
  };

  const handleUnarchiveNoteClick = () => {
    unarchiveNote(noteId);
  };

  const [isShown, setIsShown] = useState(false);

  const styles = {
    backgroundColor: "transparent",
    border: "none",
    fontSize: ".8rem",
    boxShadow: "none",
  };

  return (
    <div>
      <div
        className="note"
        style={{ backgroundColor: color }}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <div className="d-flex justify-content-between align-items-center">
          <NoteTitle id={id} title={title} />
        </div>
        <div className="itemListBackground" style={{ paddingLeft: "0px" }}>
          {items.length === 0 && (
            <div>
              <InputGroup className="mb-0 align-items-center">
                {has_checklist === true ? <Form.Check type="checkbox" /> : null}
                <Form.Control
                  style={styles}
                  placeholder="Create Item"
                  onKeyDown={handleCreateItem}
                />
              </InputGroup>
            </div>
          )}
          {items
            ?.filter((item) => {
              return item.completed === false;
            })
            .map((item) => (
              <ItemList
                item={item}
                key={item.id}
                has_checklist={has_checklist}
              />
            ))}
        </div>
        <hr className="horizontal-rule" />
        <div className="itemListBackground" style={{ paddingLeft: "0px" }}>
          {items
            ?.filter((item) => {
              return item.completed === true;
            })
            .map((item) => (
              <ItemList
                item={item}
                key={item.id}
                has_checklist={has_checklist}
              />
            ))}
        </div>
        <div className="d-flex justify-content-start flex-wrap" style={{}}>
          {labels
            ? labels.map((label) => <LabelList label={label} key={label.id} />)
            : null}
        </div>
        <div className="note-footer">
          {isShown && (
            <div className="d-flex justify-content-evenly align-items-center">
              <div className="icon">
                <ColorPalette id={id} color={color} />
              </div>
              {is_archived === false ? (
                <div className="icon">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>Archive Note</Tooltip>}>
                  <ArchiveOutlinedIcon onClick={handleArchiveNoteClick} />
                  </OverlayTrigger>
                </div>
              ) : (
                <div className="icon">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>Unarchive Note</Tooltip>}>
                  <UnarchiveOutlinedIcon onClick={handleUnarchiveNoteClick} />
                  </OverlayTrigger>
                </div>
              )}

              {is_deleted === false ? (
                <div className="icon">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete Note</Tooltip>}>
                  <DeleteForeverOutlinedIcon onClick={handleTrashNoteClick} />
                  </OverlayTrigger>
                </div>
              ) : (
                <div className="icon">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>Restore Note</Tooltip>}>
                  <RestoreFromTrashOutlinedIcon
                    onClick={handleRemoveFromTrashClick}
                  />
                  </OverlayTrigger>
                </div>
              )}
              <EditNoteDropDown
                id={id}
                title={title}
                items={items}
                color={color}
                labels={labels}
                has_checklist={has_checklist}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Note;
