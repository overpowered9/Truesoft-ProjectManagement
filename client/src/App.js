import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Dashboard from "./pages/DashBoard";
import AdminDashboard from "./pages/adminDashBoard";
function App() {
  const role = localStorage.getItem("Role");
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/admindashboard" element={<AdminDashboard />}></Route>
          <Route path="/register" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
