import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignTeamLead = ({ workspaceId }) => {
  const [teamLeadId, setTeamLeadId] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${workspaceId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/workspaces/${workspaceId}/assign-team-lead`,
        { teamLeadId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Team lead assigned successfully!");
    } catch (error) {
      console.error("Error assigning team lead", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Assign Team Lead</h3>
      <select
        value={teamLeadId}
        onChange={(e) => setTeamLeadId(e.target.value)}
        required
      >
        <option value="">Select Team Lead</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <button type="submit">Assign Team Lead</button>
    </form>
  );
};

export default AssignTeamLead;
