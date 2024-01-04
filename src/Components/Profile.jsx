import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import {
  Button,
  FloatingLabel,
  Form,
  Row,
  Col,
  Card,
  InputGroup,
  Toast,
} from "react-bootstrap";

function Profile() {
  const { user, updateUser } = useNoteAppContext();

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pictureURL, setPictureURL] = useState("");

  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);

  const profilePic = pictureURL ? pictureURL : user.picture;

  const handleInfoSubmit = (e) => {
    e.preventDefault();

    if (newEmail !== confirmEmail) {
      alert("Emails do not match");
      return;
    } else if (newEmail === user.email) {
      alert("New email cannot be the same as old email");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else if (newPassword === user.password) {
      alert("New password cannot be the same as old password");
      return;
    }

    updateUser(newName, newEmail, newPassword, pictureURL);
    setNewName("");
    setNewEmail("");
    setConfirmEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setPictureURL("");

    if (
      newName !== "" ||
      newEmail !== "" ||
      newPassword !== "" ||
      pictureURL !== ""
    ) {
      setShowToast(true);
    }
  };

  const handleCancel = () => {
    setNewName("");
    setNewEmail("");
    setConfirmEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setPictureURL("");
  };

  return (
    <div id="profile-container">
      <h1 id="profile-title">Profile</h1>
      <div id="profile">
        <Card id="profile-card">
          <Card.Img id="profile-photo" variant="top" src={profilePic} />
          <Card.Body>
            <Card.Title>Name: {user.name}</Card.Title>
            <Card.Text>Email: {user.email}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <hr />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Change Profile Picture:</Form.Label>
        </Form.Group>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroupFileAddon01">URL:</InputGroup.Text>
          <Form.Control
            onChange={(e) => setPictureURL(e.target.value)}
            type="url"
            placeholder="Enter URL"
            aria-label="Upload"
            aria-describedby="inputGroupFileAddon01"
            value={pictureURL}
          />
        </InputGroup>
        <hr />
        <Form.Group as={Col} className="mb-3" controlId="formBasicName">
          <Form.Label>Edit User Info</Form.Label>
          <FloatingLabel type="text" controlId="formBasicName" label="Name">
            <Form.Control
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Row>
          <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
            <FloatingLabel id="formBasicEmail" label="New Email">
              <Form.Control
                type="email"
                placeholder="New Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} className="mb-3" id="formConfirmEmail">
            <FloatingLabel id="formConfirmEmail" label="Confirm Email">
              <Form.Control
                type="email"
                placeholder="Confirm Email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} className="mb-3" id="formBasicPassword">
            <FloatingLabel controlId="formBasicPassword" label="New Password">
              <Form.Control
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} className="mb-3" id="formConfirmPassword">
            <FloatingLabel
              controlId="formConfirmPassword"
              label="Confirm Password"
            >
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
        </Row>
        <div id="edit-profile-buttons">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleInfoSubmit}>
            Save Changes
          </Button>
        </div>
      </Form>
      {/* <div id="test-email-container">
        <h3>Test Email</h3>
        <Button variant="warning" onClick={testEmail}>
          Send Test Email
        </Button>
      </div> */}
      <Toast show={showToast} onClose={toggleShowToast}>
        <Toast.Header>
          <strong className="me-auto">Profile Updated</strong>
        </Toast.Header>
        <Toast.Body>Your profile has been updated</Toast.Body>
      </Toast>
    </div>
  );
}

export default Profile;
