import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Offcanvas from "react-bootstrap/Offcanvas";
import Badge from "react-bootstrap/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import Nav from "react-bootstrap/Nav";
import EditLabelsModal from "./EditLabelsModal";
import DarkModeToggle from "./DarkModeToggle";
import GridViewToggle from "./GridViewToggle";
import ColumnViewToggle from "./ColumnViewToggle";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";

function SideNav() {
  const { isLoggedIn, notes, userLabels, columnView, setDarkMode } = useNoteAppContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () =>  setShow(true)

  
  const archivedNoteCount = isLoggedIn && notes ? notes.reduce((acc, note) => {
    if (note.is_archived) {
      acc += 1;
    }
    return acc;
  }, 0) : 0;

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
                  <Badge bg="primary" style={{}}>
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
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <ArchiveOutlinedIcon />
              <Nav.Link href="/archived_notes" style={{ marginLeft: ".5rem" }}>
                Archived
              </Nav.Link>
            </div>
            {archivedNoteCount >= 0 && (
              <Badge bg="secondary" style={{}}>
                {archivedNoteCount}
              </Badge>
            )}
          </div>
          <div className="d-flex">
            <DeleteForeverOutlined />
            <Nav.Link href="/deleted_notes" style={{ marginLeft: ".5rem" }}>
              Trash
            </Nav.Link>
          </div>
          <hr />
          <EditLabelsModal />
          <hr />
         

          {columnView ? (
            <Nav.Link id="grid-view-toggle2">
              <GridViewToggle />
            </Nav.Link>
          ) : (
            <Nav.Link id="column-view-toggle2">
              <ColumnViewToggle />
            </Nav.Link>
          )}
          <hr />
           <Nav.Link id="dark-mode-toggle2">
            <DarkModeToggle handleToggleDarkMode={setDarkMode} />
          </Nav.Link>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default SideNav;
