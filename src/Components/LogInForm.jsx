import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginCall } from "../API-Adapter";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useNoteAppContext } from "../Provider/NoteAppProvider";

function LogInForm() {
  const { setToken, setUser, setIsLoggedIn, getUserNotes, getUserLabels } =
    useNoteAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (email === "" || password === "") {
        alert("Please fill out all fields!");
      } else if (localStorage.getItem("token")) {
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
          navigate("/");
        } else {
          alert(result.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="login-form-container">
      <Form id="login-form" className="p-5">
        <Form.Label className="mb-3">
          <h3>Please login below</h3>
        </Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            className="mb-3"
            controlId="formBasicEmail"
            label="Email"
          >
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={handleEmail}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel
            className="mb-3"
            controlId="formBasicPassword"
            label="Password"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePassword}
            />
          </FloatingLabel>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit" onClick={handleLogin}>
            Login
          </Button>
        </div>
        <Form.Group className="mb-3" controlId="formBasicRegister">
          <Form.Text className="text-muted">
            Don't have an account? <a href="/register">Register</a>
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formForgotPassword">
          <Form.Text className="text-muted">
            Forgot your password? <a href="/forgot-password">Reset Password</a>
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
}

export default LogInForm;
