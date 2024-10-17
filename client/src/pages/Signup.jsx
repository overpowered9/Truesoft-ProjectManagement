// src/pages/SignupPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
//taostify
const notify = () => toast.success("Success");
const notifyerror = () => toast.error("Error Sigining Up, Try Again");
function handlenotification(newState) {
  newState === 0 ? notify() : notifyerror();
}
//
const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      // Assuming the response contains a token, store it in local storage
      localStorage.setItem("token", response.data.token);
      // Redirect to dashboard or login page after signup
      handlenotification(0);
    } catch (error) {
      handlenotification(1);
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className=" w-[100vw] h-[100vh] bg-blue-800  p-[50px]  overflow-hidden flex justify-center flex-row">
      <ToastContainer />
      <div className=" w-[50%] bg-blue-800 h-[100%] text-cyan-50 flex justify-center items-center">
        <p className=" font-sans font-medium text-5xl">Truesoft</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-[50%] justify-center align-middle items-center flex-col gap-10 bg-white border-r-slate-900 border-gray-950 shadow-lg p-10"
      >
        <div className="">
          <TextField
            label=" Name"
            variant="filled"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <TextField
            label="Email"
            variant="filled"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <TextField
            label="Password"
            variant="filled"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
