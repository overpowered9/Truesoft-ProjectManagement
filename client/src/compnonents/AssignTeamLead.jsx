import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignTeamLead = ({ workspaceId, onUpdate }) => {
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
        console.log(response.data);
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
        `http://localhost:5000/api/workspaces/${workspaceId}/assign-team-lead`,
        { teamLeadId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Team lead assigned successfully");
      onUpdate(); // Trigger a re-fetch of the data
    } catch (error) {
      console.error("Error assigning team lead", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow-md rounded-lg"
    >
      <div>
        <label
          htmlFor="teamLead"
          className="block text-sm font-medium text-gray-700"
        >
          Select Team Lead
        </label>
        <select
          id="teamLead"
          value={teamLeadId}
          onChange={(e) => setTeamLeadId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Assign Team Lead
        </button>
      </div>
    </form>
  );
};

export default AssignTeamLead;
