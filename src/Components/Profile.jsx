import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import {
  Button,
  FloatingLabel,
  Form,
  Image,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";

function Profile() {
  const { user, updateUser, isLoggedIn } = useNoteAppContext();

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [previewPicture, setPreviewPicture] = useState(user.picture);
  const [newPicture, setNewPicture] = useState("");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setPreviewPicture(URL.createObjectURL(file));
    setNewPicture(URL.createObjectURL(file));

    console.log(file);
    console.log(newPicture);
  };

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    if (newName !== "") {
      console.log(newName);
    }

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

    if (newPicture !== "") {
      console.log(newPicture);
    }

    console.log(newEmail);
    updateUser(newName, newEmail, newPassword, newPicture);
  };

  let style = {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    objectFit: "cover",
  };
// console.log(isLoggedIn);
//   if (!isLoggedIn) {
//     return <Navigate to="/" />;
//   } else {

  return (
    <div id="profile-container">
      <h1 id="profile-title">Profile</h1>
      <div id="profile">
        <Card id="profile-card">
          <Card.Img
            id="profile-photo"
            variant="top"
            src={user.picture}
          />
          <Card.Body>
            <Card.Title>Name: {user.name}</Card.Title>
            <Card.Text>Email: {user.email}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <hr />
      <div id="edit-profile-photo">
        <Form.Label>Change Profile Picture</Form.Label>
        {previewPicture ? (
          <Image id="change-profile-photo" src={previewPicture} />
        ) : (
          <PortraitOutlinedIcon id="profile-photo" style={style} />
        )}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" onChange={handlePhotoUpload} />
        </Form.Group>
      </div>
      <hr />
      <div id="edit-profile-form">
        <Form>
          <Form.Group as={Col} className="mb-3" controlId="formBasicName">
            <Form.Label>Edit User Info</Form.Label>
            <FloatingLabel type="text" controlId="formBasicName" label="Name">
              <Form.Control
                type="text"
                placeholder="Name"
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
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" id="formBasicEmail">
              <FloatingLabel id="formBasicEmail" label="Confirm Email">
                <Form.Control
                  type="email"
                  placeholder="Confirm Email"
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
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" id="formBasicPassword">
              <FloatingLabel
                controlId="formBasicPassword"
                label="Confirm Password"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Row>
          <div id="edit-profile-buttons">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary" onClick={handleInfoSubmit}>
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
//}

export default Profile;
