import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { registerCall } from "../API-Adapter";
import { FloatingLabel, Form, Button } from "react-bootstrap";

function RegisterForm() {

  const { setIsLoggedIn, setToken, setUser, getUserNotes, getUserLabels } =
  useNoteAppContext();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirm] = useState("");

 const navigate = useNavigate(); 

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
        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

  return (
    <div id="register-form-container">
      <Form id="register-form" className="p-5">
        <Form.Label className="mb-3">
            <h3>Please register below</h3>
        </Form.Label>
        <Form.Group className="mb-3" controlId="formBasicName">
          <FloatingLabel
            className="mb-3"
            controlId="formBasicName"
            label="Enter name"
          >
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setName(e.target.value)} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            className="mb-3"
            controlId="formBasicEmail"
            label="Enter email"
          >
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel
            className="mb-3"
            controlId="formBasicPassword"
            label="Password"
          >
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel
            className="mb-3"
            controlId="formBasicPassword"
            label="Confirm Password"
          >
            <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} />
          </FloatingLabel>
        </Form.Group>
        <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit" onClick={handleRegister}>
          Register
        </Button>
        </div>
        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Text className="text-muted">
            Already have an account? <a href="/">Login</a>
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
}

export default RegisterForm;
