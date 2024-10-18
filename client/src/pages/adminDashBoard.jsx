import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateWorkspace from "../components/CreateWorkspace";
import WorkspaceList from "../components/WorkspaceList";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState([]);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("Role");
    if (role !== "admin") {
      setAccessDenied(true);
      navigate("/login");
    } else {
      fetchWorkspaces();
    }
  }, [navigate]);

  const fetchWorkspaces = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/workspaces", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWorkspaces(response.data);
    } catch (error) {
      console.error("Error fetching workspaces", error);
    }
  };

  const handlebuttonclick = () => {
    try {
      navigate("/register");
    } catch (error) {
      console.error(error);
    }
  };

  if (accessDenied) {
    return (
      <p className="text-red-500 text-center mt-4">
        Access denied. Admins only.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="mb-6">
        <CreateWorkspace onWorkspaceCreated={fetchWorkspaces} />
      </div>
      <div className="mb-6">
        <WorkspaceList workspaces={workspaces} />
      </div>
      <div className="flex justify-center">
        <Button
          variant="contained"
          onClick={handlebuttonclick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Manage Users
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
