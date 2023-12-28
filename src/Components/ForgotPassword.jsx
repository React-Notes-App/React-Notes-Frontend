import React from "react";
import { useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useNoteAppContext } from "../Provider/NoteAppProvider";

function ForgotPassword() {
  const { OTP, setOTP, sendOTP, testEmail } = useNoteAppContext();
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Please enter email");
      return;
    } else if (email) {
      console.log(email);
      let newOTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(newOTP);
      setOTP(newOTP);
    }
    sendOTP(email, OTP);
    navigate("/otp");
  };
  return (
    <div id="forgot-password-form-container">
      <Form id="forgot-password-form" className="p-5">
        <Form.Label className="mb-3">
          <h3>Please enter email</h3>
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit" onClick={handleSendOTP}>
            Submit
          </Button>
        </div>
        <Form.Group className="mb-3" controlId="formBasicRegister">
          <Form.Text className="text-muted">
            Already reset your password ? <a href="/login">Login</a>
          </Form.Text>
        </Form.Group>
        <div id="test-email-container">
        <h3>Test Email</h3>
        <Button variant="warning" onClick={testEmail}>
          Send Test Email
        </Button>
      </div>
      </Form>
    </div>
  );
}

export default ForgotPassword;
