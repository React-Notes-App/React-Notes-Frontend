import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import FaceIcon from "@mui/icons-material/Face";
import { FormControl, InputGroup, NavDropdown } from "react-bootstrap";
import { getUserNotesCall, loginCall } from "../API-Adapter";

function LogIn() {

  const { setToken, setUser, setIsLoggedIn, token, user, getUserNotes } = useNoteAppContext();
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
          console.log("token:", result.token);
          console.log("user:", result.user);
          console.log(token);
          console.log(user);
          getUserNotes(result.token, result.user.id);
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
      {/* <FaceIcon onClick={handleShowLogin} /> */}
      <NavDropdown.Item onClick={handleShowLogin}>Login</NavDropdown.Item>
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
              onChange={handleEmail}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              type="password"
              id="inputPassword"
              aria-describedby="passwordHelp"
              placeholder="Password"
              required
              onChange={handlePassword}
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
