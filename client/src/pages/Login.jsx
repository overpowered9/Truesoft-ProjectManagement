import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Role, setrole] = useState("team member");
  const navigate = useNavigate();
  function setRole(role) {
    setrole(role);
  }
  //taostify
  const notify = () => toast.success("Success");
  const notifyerror = () => toast.error("Invalid Credentials");
  function handlenotification(newState) {
    newState === 0 ? notify() : notifyerror();
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/login${Role}`,
        { email, password }
      );
      // Assuming the response contains a token, store it in local storage (or context)
      localStorage.setItem("token", response.data.token);
      // Redirect to dashboard or home page after login
      console.log(localStorage.getItem("token"));

      localStorage.setItem("Role", Role);

      console.log(localStorage.getItem("token"));
      Role === "tm" ? navigate("/dashboard") : navigate("/admindashboard");
    } catch (error) {
      handlenotification(1);
      console.error("Login failed:", error);
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="tm">Team Member</MenuItem>
              <MenuItem value="tl">Team Lead</MenuItem>
              <MenuItem value="admin">Admin </MenuItem>
            </Select>
          </FormControl>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
