import React from "react";
import { Button, FloatingLabel, Form, Image, Row, Col } from "react-bootstrap";

function Profile() {
  return (
    <div id="profile-container">
      <div id="edit-profile-photo">
        <Form.Label>Change Profile Picture</Form.Label>
        <Image
          id="profile-photo"
          src="https://pyxis.nymag.com/v1/imgs/692/8f5/2180fb8d862b6a57d7b3f406795e950360-26-atomic-blonde.rsquare.w400.jpg"
          roundedCircle
        />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" />
        </Form.Group>
        <div id="upload-photo-button">
          <Button variant="primary">Upload Photo</Button>
        </div>
      </div>
      <hr/>
      <div id="edit-profile-form">
        <Form>
          <Form.Group as={Col} className="mb-3" controlId="formBasicName">
            <Form.Label>Edit User Info</Form.Label>
            <FloatingLabel type="text" controlId="formBasicName" label="Name">
              <Form.Control type="text" placeholder="Name" />
            </FloatingLabel>
          </Form.Group>

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="formBasicEmail" label="New Email">
                <Form.Control type="text" placeholder="New Email" />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="formBasicEmail" label="Confirm Email">
                <Form.Control type="text" placeholder="Confirm Email" />
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="formBasicPassword" label="New Password">
                <Form.Control type="text" placeholder="New Password" />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
              <FloatingLabel
                controlId="formBasicPassword"
                label="Confirm Password"
              >
                <Form.Control type="text" placeholder="Confirm Password" />
              </FloatingLabel>
            </Form.Group>
          </Row>
          <div id="edit-profile-buttons">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save Changes</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Profile;
