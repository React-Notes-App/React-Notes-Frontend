import React, { useEffect } from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Offcanvas from "react-bootstrap/Offcanvas";
import Badge from "react-bootstrap/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import Nav from "react-bootstrap/Nav";
import EditLabels from "./EditLabelsModal";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";

function SideNav() {
  const { isLoggedIn, notes, userLabels } = useNoteAppContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const archivedNoteCount = notes.reduce((acc, note) => {
    if (note.is_archived) {
      acc += 1;
    }
    return acc;
  }, 0);

  //  const foo = getNotesByLabel(1)
  //   console.log(foo, "foo")

  // const notesLabels = notes.reduce((acc, note) => {
  //   note.labels.forEach((label) => {
  //     if (acc[label.label_name]) {
  //       acc[label.label_name] += 1;
  //     } else {
  //       acc[label.label_name] = 1;
  //     }
  //   });
  //   return acc;
  // }, {});

  // console.log(notesLabels, "notesLabels");

  return (
    <div>
      <MenuIcon sx={{ fontSize: 40 }} onClick={handleShow} className="me-2" />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notes</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {isLoggedIn &&
            userLabels.map((label) => (
              <div
                className="d-flex align-items-center justify-content-between"
                key={label.label_name}
              >
                <div className="d-flex align-items-center">
                  <LabelOutlinedIcon />
                  <Nav.Link
                    href={`/labels/${label.id}`}
                    style={{ marginLeft: ".5rem" }}
                  >
                    {label.label_name}
                  </Nav.Link>
                </div>
                {label.note_count > 0 && (
                  <Badge bg="primary" style={{ marginLeft: ".5rem" }}>
                    {label.note_count}
                  </Badge>
                )}
              </div>
            ))}
          <hr />
          <div className="d-flex">
            <ListAltOutlinedIcon />
            <Nav.Link href="/" style={{ marginLeft: ".5rem" }}>
              Notes
            </Nav.Link>
          </div>
          <div className="d-flex">
            <ArchiveOutlinedIcon />
            <Nav.Link href="/archived_notes" style={{ marginLeft: ".5rem" }}>
              Archived
            </Nav.Link>
            {archivedNoteCount > 0 && (
              <Badge pill bg="secondary" style={{ marginLeft: ".5rem" }}>
                {archivedNoteCount}
              </Badge>
            )}
          </div>
          <div className="d-flex">
            <DeleteForeverOutlined />
            <Nav.Link href="/deleted_notes" style={{ marginLeft: ".5rem" }}>
              Deleted
            </Nav.Link>
          </div>
          <hr />
          <EditLabels />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default SideNav;
