import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteUser = ({ workspaceId, onUpdate }) => {
  const [userIds, setUserIds] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/workspaces/${workspaceId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data.members);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, [workspaceId]);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setUserIds([...userIds, value]);
    } else {
      setUserIds(userIds.filter((id) => id !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const userId of userIds) {
        await axios.put(
          `http://localhost:5000/api/workspaces/${workspaceId}/remove-user/${userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      alert("Users removed from workspace successfully!");
      onUpdate(); // Trigger a re-fetch of the data
    } catch (error) {
      console.error("Error removing users", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow-md rounded-lg"
    >
      <h3 className="text-xl font-bold mb-4">Remove Users from Workspace</h3>
      {users.map((user) => (
        <div key={user._id} className="flex items-center mb-2">
          <input
            type="checkbox"
            value={user._id}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">{user.name}</label>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Remove Users
        </button>
      </div>
    </form>
  );
};

export default DeleteUser;
