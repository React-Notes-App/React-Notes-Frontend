import React from 'react'
import { Navigate } from 'react-router-dom'
import { useNoteAppContext } from '../Provider/NoteAppProvider'

function OTPProtectedRoute({children}) {

  const {OTPVerified} = useNoteAppContext();
  if (!OTPVerified) {
    return <Navigate to="/otp" />;
  }
  else {
    return children
  }
}

export default OTPProtectedRoute