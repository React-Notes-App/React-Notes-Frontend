import React from "react";
import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

function Register() {
  const [showRegister, setShowRegister] = useState(false);
  const handleRegisterShow = () => setShowRegister(true);
  const handleRegisterClose = () => setShowRegister(false);
  return (
    <div>
        <h1>I am the Register Page</h1>
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
            type="email"
            id="registerEmail"
            aria-describedby="emailHelp"
            placeholder="Email Address"
            required
            />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            type="password"
            id="registerPassword"
            placeholder="Password"
            aria-label="Password"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            aria-label="Password"
          />
        </InputGroup>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Register;
