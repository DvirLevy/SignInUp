import React from 'react';
import './App.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import ForgotPassword from './Components/ForgotPassword';
import { Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/ResetPassword" element={<ForgotPassword/>} />
      </Routes>
    </div>
  );
}

export default App;