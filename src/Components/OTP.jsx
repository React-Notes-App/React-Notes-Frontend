import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useNoteAppContext } from "../Provider/NoteAppProvider";

function OTP() {
  const { OTP, sendOTP, email, setOTPVerified } = useNoteAppContext();
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disabled, setDisabled] = useState(true);
  const [timer, setTimer] = useState(60);

  const navigate = useNavigate();

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (OTPinput.join("") === "0000") {
      alert("Please enter OTP");
    }
    if (OTP === parseInt(OTPinput.join(""))) {
        setOTPVerified(true);
      navigate("/reset-password");
    } else {
      alert("Incorrect OTP");
    }
  };

  const handleResendOTP = (e) => {
    if (disabled) return;
    sendOTP(email, OTP);
    setDisabled(true);
    setTimer(60);
  };

  useEffect(() => {
    let interval = setInterval(() => {
        setTimer((lastTimer) => {
            lastTimer <= 1 && clearInterval(interval);
            if (lastTimer <= 1) 
                setDisabled(false);
            if (lastTimer <= 0) 
                return lastTimer;
            return lastTimer - 1;
        })
  }, 1000);
    return () => 
        clearInterval(interval);
    }, [disabled]);


  return (
    <div id="OTP-Container">
      <Form id="OTP-Form" className="p-5">
        <Form.Label className="mb-3">
          <h4>Email Verification</h4>
          <p>We have sent a code to your email: {email}</p>
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
          <Button variant="primary" type="submit" onClick={handleVerifyOTP}>
            Submit
          </Button>
        </div>
        <Form.Text className="text-muted">
          Didn't receive OTP?{" "}
          {disabled ? 
          < Button variant="link" disabled> {disabled ? `Resend OTP in ${timer}s` : "Resend OTP"} 
          </Button> :
            <Button variant="link" onClick={handleResendOTP}>Resend OTP</Button>}
        </Form.Text>
      </Form>
    </div>
  );
}

export default OTP;
