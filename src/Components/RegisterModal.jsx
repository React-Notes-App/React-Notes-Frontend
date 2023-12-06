import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import {
  Button,
  Form,
  Modal,
  FormGroup,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { registerCall } from "../API-Adapter";
import LogInModal from "./LogInModal";

function Register({ handleCloseLogin }) {
  const [showRegister, setShowRegister] = useState(false);
  const handleRegisterShow = () => setShowRegister(true);
  const handleRegisterClose = () => setShowRegister(false);

  const { setIsLoggedIn, setToken, setUser, getUserNotes, getUserLabels } =
    useNoteAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (event) => {
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
          navigate("/notes");
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
      <Button variant="link" onClick={handleRegisterShow}>
        Register Here
      </Button>
      <Modal show={showRegister} onHide={handleRegisterClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form>
            <Row>
              <FormGroup as={Col} className="mb-3">
                <FloatingLabel
                  type="text"
                  controlId="formRegisterName"
                  label="Name"
                >
                  <Form.Control
                    type="name"
                    controlId="formRegisterName"
                    aria-describedby="nameHelp"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </FormGroup>
              <FormGroup as={Col} className="mb-3">
                <FloatingLabel
                  type="text"
                  controlId="formRegisterEmail"
                  label="Email"
                >
                  <Form.Control
                    type="email"
                    controlId="formRegisterEmail"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </FormGroup>
            </Row>

            <FormGroup className="mb-3">
              <FloatingLabel
                type="text"
                controlId="formRegisterPassword"
                label="Password"
              >
                <Form.Control
                  type="password"
                  controlId="formRegisterPassword"
                  placeholder="Password"
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FloatingLabel>
            </FormGroup>
            <FormGroup className="mb-3">
              <FloatingLabel
                type="text"
                controlId="formRegisterConfirmPassword"
                label="Confirm Password"
              >
                <Form.Control
                  type="password"
                  id="formRegisterConfirmPassword"
                  placeholder="Confirm Password"
                  aria-label="Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </FloatingLabel>
            </FormGroup>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleRegisterClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleRegister}>
                Register
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-start align-items-center">
          <Form.Label className="text-muted">
            Already have an account?
          </Form.Label>
          <LogInModal handleCloseLogin={handleCloseLogin} />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Register;
