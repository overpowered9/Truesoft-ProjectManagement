import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkspaceTaskList2 from "../compnonents/WorkspaceTaskList2";

const TeamMemberDashboard = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/workspaces/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setWorkspaces(response.data);
      } catch (error) {
        console.error("Error fetching workspaces", error);
      }
    };
    fetchWorkspaces();
  }, []);

  const handleWorkspaceSelect = (workspaceId) => {
    setSelectedWorkspace(workspaceId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Team Member Dashboard
      </h1>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Your Workspaces</h2>
        <ul className="bg-white shadow-md rounded-lg p-4">
          {workspaces.map((workspace) => (
            <li
              key={workspace._id}
              className="border-b last:border-none py-2 px-4 hover:bg-gray-100"
              onClick={() => handleWorkspaceSelect(workspace._id)}
            >
              {workspace.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        {selectedWorkspace && (
          <WorkspaceTaskList2 workspaceId={selectedWorkspace} />
        )}
      </div>
    </div>
  );
};

export default TeamMemberDashboard;
