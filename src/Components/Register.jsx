import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { registerCall } from "../API-Adapter";

function Register({handleCloseLogin}) {
  const [showRegister, setShowRegister] = useState(false);
  const handleRegisterShow = () => setShowRegister(true);
  const handleRegisterClose = () => setShowRegister(false);

  const {
    setIsLoggedIn,
    setToken,
    setUser,
    getUserNotes,
    getUserLabels,
  } = useNoteAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");

  const handleRegister = async (event) => {
    console.log("register:", name, email, password, confirmPassword);
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else if (localStorage.getItem("token")) {
      alert("You are already logged in!");
    } else {
      try {
        const result = await registerCall(name, email, password);
        console.log(result);
        if (result.success) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
          setToken(result.token);
          setUser(result.user);
          setIsLoggedIn(true);
          await getUserNotes(result.token, result.user.id);
          await getUserLabels(result.token, result.user.id);
          handleRegisterClose();
          handleCloseLogin();
        
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleRegisterShow}>
        Register Here
      </Button>
      <Modal show={showRegister} onHide={handleRegisterClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              type="name"
              id="registerName"
              aria-describedby="nameHelp"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Form.Control
              type="email"
              id="registerEmail"
              aria-describedby="emailHelp"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              id="registerPassword"
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              aria-label="Password"
              value={confirmPassword}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRegisterClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Register;
