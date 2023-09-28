import React from "react";
import { useState } from "react";
import Header from "./Header";
import Offcanvas from "react-bootstrap/Offcanvas";
import MenuIcon from "@mui/icons-material/Menu";

function SideNav({setDarkMode}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <MenuIcon sx={{ fontSize: 40 }} onClick={handleShow} className="me-2" />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
          <Header handleToggleDarkMode={setDarkMode} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default SideNav;
