import socketIO from 'socket.io-client';
import React from 'react'
import Join from "./component/Join/Join"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Chat from './component/Chat/Chat';




function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route  path="/" Component={Join} />
          <Route path="/chat" Component={Chat} />
        </Routes>
      </Router>
    </>
  )
}

export default App
