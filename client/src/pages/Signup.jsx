// src/pages/SignupPage.js
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";

//taostify
const notify = () => toast.success("Success");
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
    <>
      <ToastContainer />
      <div className=" w-[100vw] h-[100vh] bg-blue-800  p-[50px]  overflow-hidden flex justify-center flex-col sm:flex-row">
        <div className="flex w-[100%] h-[50%]  text-cyan-50  justify-center items-center align-middle  sm:flex sm:w-[50%] bg-blue-800 sm:h-[100%]">
          <p className=" font-sans font-medium text-5xl">Truesoft</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-[100%] justify-center align-middle items-center flex-col gap-10 bg-white border-r-slate-900 border-gray-950 shadow-lg p-10 sm:w-[50%]"
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
      </div>
    </>
  );
};

export default SignupPage;
