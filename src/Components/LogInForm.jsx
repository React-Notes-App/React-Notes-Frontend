import React from 'react'
import { FloatingLabel, Form, Button } from 'react-bootstrap'

function LogInForm() {
  return (
    <div id="login-form-container">
<Form id="login-form" className='p-5'>
    <Form.Label className='mb-3'>
        <h3>Please login below</h3>
    </Form.Label>
    <Form.Group className='mb-3' controlId="formBasicEmail">
        <FloatingLabel className='mb-3' controlId="formBasicEmail" label="Email">
            <Form.Control type="email" placeholder="Email" />
        </FloatingLabel>
    </Form.Group>
    <Form.Group className='mb-3' controlId="formBasicPassword">
        <FloatingLabel className='mb-3' controlId="formBasicPassword" label="Password">
            <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
    </Form.Group>
    <div className='d-flex justify-content-end'>
    <Button variant="primary" type="submit">
        Login
    </Button>
    </div>
    <Form.Group className='mb-3' controlId="formBasicRegister">
        <Form.Text className="text-muted">
            Don't have an account? <a href="/register">Register</a>
        </Form.Text>
    </Form.Group>
</Form>


    </div>
  )
}

export default LogInForm