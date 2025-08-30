import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import { ToastContainer } from "react-toastify";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
function App() {
  const [authMode, setAuthMode] = useState("login");

  const toggleAuthMode = () => {
    setAuthMode((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<AuthForm mode={authMode} onToggleMode={toggleAuthMode} />}
          ></Route>
          <Route path="/patient" element={<PatientDashboard />}></Route>
          <Route path="/doctor" element={<DoctorDashboard />}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
