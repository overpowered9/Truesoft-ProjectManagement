// src/pages/SignupPage.js
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import FireUser from "../compnonents/fireuser";

//taostify
const notify = () => toast.success("Success,reload to view changes");
const notifyerror = () => toast.error("Error Registring, Try Again");
function handlenotification(newState) {
  newState === 0 ? notify() : notifyerror();
}
//
const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            "Content-Type": "application/json",
          },
        }
      );
      // localStorage.setItem("regtoken", response.data.token);
      // const regtoken = localStorage.setItem("regtoken");
      // if (token === regtoken) {
      //   console.log("true");
      // }
      console.log(response.data.token);
      handlenotification(0);
    } catch (error) {
      handlenotification(1);
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="overflow-hidden ">
      <ToastContainer />
      <div className=" w-[100vw] h-[100vh] bg-blue-800  p-[50px] gap-5 overflow-hidden flex justify-center flex-col sm:flex-row">
        <form
          onSubmit={handleSubmit}
          className="flex w-[100%] justify-center align-middle items-center flex-col gap-10 bg-white border-r-slate-900 border-gray-950 shadow-lg p-10 sm:w-[40%]"
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
            Register
          </Button>
        </form>
        <FireUser></FireUser>
      </div>
    </div>
  );
};

export default SignupPage;
