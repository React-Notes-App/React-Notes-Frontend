import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { NoteApp, NavBar, Register } from './'


function Main() {
  return (
    <div>
        <NavBar />
        <Routes>
            <Route path="/" element={<NoteApp />} />
            <Route path="/Register" element={<Register/>} />
        </Routes>
    </div>
  )
}

export default Main