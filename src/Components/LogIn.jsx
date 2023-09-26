import React from "react";
import { useState } from "react";
// import { useNoteAppContext } from "../provider/NoteAppProvider";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FaceIcon from "@mui/icons-material/Face";

function LogIn() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleLogin = () => {
    console.log("login");
  };
  return (
    <div>
      <FaceIcon onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="email"
            id="inputEmail"
            aria-describedby="emailHelp"
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            id="inputPassword"
            placeholder="Password"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LogIn;
