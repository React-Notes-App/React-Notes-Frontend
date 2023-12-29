import React from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'

function ResetPassword() {

    const handleNewPassword = (e) => {
        e.preventDefault();
        console.log(e.target.value)
    }

    const handleConfirmNewPassword = (e) => {
        e.preventDefault();
        console.log(e.target.value)
    }

    const handlePasswordReset = (e) => {
        e.preventDefault();
        console.log(e.target.value)
    }   
  return (
    <div id="reset-password-form-container">
    <Form id="reset-password-form" className="p-5">
    <Form.Label className="mb-3">
      <h3>Please enter new password below</h3>
    </Form.Label>
    <Form.Group className="mb-3" controlId="formNewPassword">
      <FloatingLabel
        className="mb-3"
        controlId="formNewPassword"
        label="New password"
      >
        <Form.Control
          type="password"
          placeholder="New password"
          onChange={handleNewPassword}
        />
      </FloatingLabel>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formConfirmPassword">
      <FloatingLabel
        className="mb-3"
        controlId="formConfirmPassword"
        label="Confirm new password"
      >
        <Form.Control
          type="password"
          placeholder="Confirm new password"
          onChange={handleConfirmNewPassword}
        />
      </FloatingLabel>
    </Form.Group>
    <div className="d-flex justify-content-end">
      <Button variant="primary" type="submit" onClick={handlePasswordReset}>
        Submit
      </Button>
    </div>
    </Form>
    </div>
  )
}

export default ResetPassword;