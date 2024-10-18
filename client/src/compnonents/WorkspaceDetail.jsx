import React, { useEffect, useState } from "react";
import axios from "axios";

const WorkspaceDetail = ({ workspaceId }) => {
  const [workspace, setWorkspace] = useState(null);
  const fetchWorkspace = async () => {
    try {
      const response = await axios.get(`/api/workspaces/${workspaceId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWorkspace(response.data);
    } catch (error) {
      console.error("Error fetching workspace details", error);
    }
  };
  useEffect(() => {
    fetchWorkspace();
  }, [workspaceId]);

  if (!workspace) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{workspace.name}</h2>
      <p>{workspace.description}</p>
      <h3>Team Lead</h3>
      <p>{workspace.teamLead ? workspace.teamLead.name : "Not Assigned"}</p>
      <h3>Members</h3>
      <ul>
        {workspace.members.map((member) => (
          <li key={member._id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorkspaceDetail;
