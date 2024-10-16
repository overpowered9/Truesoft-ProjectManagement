// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      // Assuming the response contains a token, store it in local storage (or context)
      localStorage.setItem("token", response.data.token);
      // Redirect to dashboard or home page after login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid login credentials");
    }
  };

  return (
    <div className=" w-96 bg-black">
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <TextField
            variant="filled"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
