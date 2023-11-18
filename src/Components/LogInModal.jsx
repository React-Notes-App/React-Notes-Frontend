import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  FloatingLabel,
  FormControl,
  FormGroup,
  FormLabel,
  NavDropdown,
} from "react-bootstrap";
import { loginCall } from "../API-Adapter";
import RegisterModal from "./RegisterModal";

function LogIn() {
  const { setToken, setUser, setIsLoggedIn, getUserNotes, getUserLabels } =
    useNoteAppContext();
  const [showLogin, setShowLogin] = useState(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (event) => {
    console.log("login:", email, password);
    event.preventDefault();
    try {
      if (localStorage.getItem("token")) {
        alert("You are already logged in!");
      } else {
        const result = await loginCall(email, password);
        console.log(result);
        if (result.success) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
          setToken(result.token);
          setUser(result.user);
          setIsLoggedIn(true);
          await getUserNotes(result.token, result.user.id);
          await getUserLabels(result.token, result.user.id);
          handleCloseLogin();
        } else {
          alert(result.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavDropdown.Item onClick={handleShowLogin}>Login</NavDropdown.Item>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup className="mb-3">
            <FloatingLabel
              className="mb-3"
              controlId="formLoginEmail"
              label="Email Address"
            >
              <FormControl
                type="email"
                controlId="formLoginEmail"
                aria-describedby="emailHelp"
                placeholder="Email Address"
                required
                onChange={handleEmail}
              />
            </FloatingLabel>
          </FormGroup>
          <FormGroup className="mb-3">
            <FloatingLabel
              className="mb-3"
              controlId="formLoginPassword"
              label="Password"
            >
              <FormControl
                type="password"
                controlId="formLoginPassword"
                aria-describedby="passwordHelp"
                placeholder="Password"
                required
                onChange={handlePassword}
              />
            </FloatingLabel>
          </FormGroup>
          <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={handleCloseLogin}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-start">
          <FormLabel>Don't have an account?</FormLabel>
          <RegisterModal handleCloseLogin={handleCloseLogin}/>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LogIn;
