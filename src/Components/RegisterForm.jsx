import React from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";

function RegisterForm() {
  return (
    <div id="register-form-container">
      <Form id="register-form" className="p-5">
        <Form.Label className="mb-3">
            <h3>Please register below</h3>
        </Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            className="mb-3"
            controlId="formBasicEmail"
            label="Enter email"
          >
            <Form.Control type="email" placeholder="Enter email" />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel
            className="mb-3"
            controlId="formBasicPassword"
            label="Password"
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel
            className="mb-3"
            controlId="formBasicPassword"
            label="Confirm Password"
          >
            <Form.Control type="password" placeholder="Confirm Password" />
          </FloatingLabel>
        </Form.Group>
        <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Register
        </Button>
        </div>
        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Text className="text-muted">
            Already have an account? <a href="/login">Login</a>
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
}

export default RegisterForm;
