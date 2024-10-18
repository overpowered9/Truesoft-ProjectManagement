import React, { useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import WorkspaceList from "../compnonents/WorkspaceList";
import WorkspaceDetailteamlead from "../compnonents/WorkspaceDetailteamlead";

const TLDashboard = () => {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

  const fetchWorkspaces = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/workspaces/team-lead/${userId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setWorkspaces(response.data);
    } catch (error) {
      console.error("Error fetching workspaces", error);
    }
  }, [userId]);
  useEffect(() => {
    const role = localStorage.getItem("Role");
    if (role !== "tl") {
      setAccessDenied(true);
      navigate("/login");
    } else {
      fetchWorkspaces();
    }
  }, [navigate, fetchWorkspaces]);

  const handleWorkspaceSelect = (workspaceId) => {
    setSelectedWorkspace(workspaceId);
  };

  useEffect(() => {
    console.log("Updated Selected Workspace:", selectedWorkspace);
  }, [selectedWorkspace]);

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
      <div className="mb-6"></div>
      <div className="mb-6">
        <WorkspaceList
          workspaces={workspaces}
          onWorkspaceSelect={handleWorkspaceSelect}
          fetchWorkspaces={fetchWorkspaces}
        />
      </div>
      <div className="mb-6">
        {selectedWorkspace && (
          <WorkspaceDetailteamlead workspaceId={selectedWorkspace} />
        )}
      </div>
      <div className="flex justify-center"></div>
    </div>
  );
};

export default TLDashboard;
