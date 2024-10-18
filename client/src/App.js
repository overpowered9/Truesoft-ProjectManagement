import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import AdminDashboard from "./pages/adminDashBoard";
import TLDashboard from "./pages/TeamLeaddash";
import TeamMemberDashboard from "./pages/DashBoard";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<TeamMemberDashboard />}></Route>
          <Route path="/admindashboard" element={<AdminDashboard />}></Route>
          <Route path="/TLdashboard" element={<TLDashboard />}></Route>
          <Route path="/register" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/" element={<LoginPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
