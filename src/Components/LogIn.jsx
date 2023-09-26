import React from "react";
import { useState } from "react";
// import { useNoteAppContext } from "../provider/NoteAppProvider";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FaceIcon from "@mui/icons-material/Face";
import { FormControl, InputGroup } from "react-bootstrap";

function LogIn() {
  const [showLogin, setShowLogin] = useState(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleLogin = () => {
    console.log("login");
  };
  return (
    <div>
      <FaceIcon onClick={handleShowLogin} />

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              type="email"
              id="inputEmail"
              aria-describedby="emailHelp"
              placeholder="Email Address"
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              type="password"
              id="inputPassword"
              aria-describedby="passwordHelp"
              placeholder="Password"
              required
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" href="/register">
            Register Here
          </Button>
          <Button variant="secondary" onClick={handleCloseLogin}>
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
