import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AssignTeamLead from "./AssignTeamLead";
import AddUser from "./Addusertoworkspace";
import DeleteUser from "./Deleteuser";

const WorkspaceDetailsimple = ({ workspaceId }) => {
  const [workspace, setWorkspace] = useState(null);
  const [showAssignTeamLead, setShowAssignTeamLead] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger re-fetch

  const fetchWorkspace = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/workspaces/${workspaceId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setWorkspace(response.data);
    } catch (error) {
      console.error("Error fetching workspace details", error);
    }
  }, [workspaceId]);

  useEffect(() => {
    fetchWorkspace();
  }, [fetchWorkspace, updateTrigger]); // Re-fetch when updateTrigger changes

  const handleUpdate = () => {
    setShowAddUser(false);
    setShowDeleteUser(false);
    setShowAssignTeamLead(false);
    setUpdateTrigger(!updateTrigger); // Toggle updateTrigger to re-fetch data
  };

  if (!workspace) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">{workspace.name}</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Description</h3>
        <p>{workspace.description || "Does not exist yet"}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Team Lead</h3>
        <p>
          {workspace.teamLead ? workspace.teamLead.name : "Does not exist yet"}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Members</h3>
        {workspace.members && workspace.members.length > 0 ? (
          <ul className="list-disc list-inside">
            {workspace.members.map((member) => (
              <li key={member._id}>{member.name}</li>
            ))}
          </ul>
        ) : (
          <p>Does not exist yet</p>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Tasks</h3>
        {workspace.tasks && workspace.tasks.length > 0 ? (
          <ul className="list-disc list-inside">
            {workspace.tasks.map((task) => (
              <li key={task._id}>
                <strong>{task.title}</strong>: {task.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>Does not exist yet</p>
        )}
      </div>
    </div>
  );
};

export default WorkspaceDetailsimple;
