import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useNoteAppContext } from "../Provider/NoteAppProvider";

function OTP() {
  const { OTP } = useNoteAppContext();
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);

  const navigate = useNavigate();

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    console.log(OTP);
    console.log(OTPinput.join(""));
    if (OTPinput.join("") === "0000") {
      alert("Please enter OTP");
    }
    if (OTP === OTPinput.join("")) {
      navigate("/reset-password");
    } else {
      alert("Incorrect OTP");
    }
  };

  return (
    <div id="OTP-Container">
      <Form id="OTP-Form" className="p-5">
        <Form.Label className="mb-3">
          <h4>Please enter OTP below</h4>
        </Form.Label>

        <Form.Group id="OTP-Input" controlId="formOTP">
          <Form.Control
            className="mb-3 text-center"
            type="text"
            size="lg"
            maxLength={1}
            placeholder="0"
            onChange={(e) =>
              setOTPinput([
                e.target.value,
                OTPinput[1],
                OTPinput[2],
                OTPinput[3],
              ])
            }
          />
          <Form.Control
            className="mb-3 text-center"
            type="text"
            size="lg"
            maxLength={1}
            placeholder="0"
            onChange={(e) =>
              setOTPinput([
                OTPinput[0],
                e.target.value,
                OTPinput[2],
                OTPinput[3],
              ])
            }
          />
          <Form.Control
            className="mb-3 text-center"
            type="text"
            size="lg"
            maxLength={1}
            placeholder="0"
            onChange={(e) =>
              setOTPinput([
                OTPinput[0],
                OTPinput[1],
                e.target.value,
                OTPinput[3],
              ])
            }
          />
          <Form.Control
            className="mb-3 text-center"
            type="text"
            size="lg"
            maxLength={1}
            placeholder="0"
            onChange={(e) =>
              setOTPinput([
                OTPinput[0],
                OTPinput[1],
                OTPinput[2],
                e.target.value,
              ])
            }
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit" onClick={handleOTPSubmit}>
            Submit
          </Button>
        </div>
        <Form.Text className="text-muted">
          Didn't receive OTP? <a href="/resend-otp">Resend OTP</a>
        </Form.Text>
      </Form>
    </div>
  );
}

export default OTP;
