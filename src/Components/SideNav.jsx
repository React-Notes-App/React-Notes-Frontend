import React from "react";
import { useState } from "react";

import Offcanvas from "react-bootstrap/Offcanvas";
import MenuIcon from "@mui/icons-material/Menu";
import { Nav } from "react-bootstrap";

function SideNav() {
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
          <Nav.Link href="/">Notes</Nav.Link>
          <Nav.Link href="/archived_notes">Archived</Nav.Link>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default SideNav;
