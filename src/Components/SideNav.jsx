import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Offcanvas from "react-bootstrap/Offcanvas";
import MenuIcon from "@mui/icons-material/Menu";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import Nav from "react-bootstrap/Nav";
import EditLabels from "./EditLabels";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";

function SideNav() {
  const { userLabels, isLoggedIn } = useNoteAppContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              <div className="d-flex" key={label.label_name}>
                <LabelOutlinedIcon />
                <Nav.Link href={`/labels/${label.id}`}>
                  {label.label_name}
                </Nav.Link>
              </div>
            ))}
          <hr />
          <div className="d-flex">
            <ListAltOutlinedIcon />
            <Nav.Link href="/">Notes</Nav.Link>
          </div>
          <div className="d-flex">
            <ArchiveOutlinedIcon />
            <Nav.Link href="/archived_notes">Archived</Nav.Link>
          </div>
          <div className="d-flex">
            <DeleteForeverOutlined />
            <Nav.Link href="/deleted_notes">Deleted</Nav.Link>
          </div>
          <hr />
          <EditLabels />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default SideNav;
