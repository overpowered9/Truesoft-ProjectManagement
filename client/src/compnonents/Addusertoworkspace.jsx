import React, { useState, useEffect } from "react";
import axios from "axios";

const AddUser = ({ workspaceId, onUpdate }) => {
  const [userIds, setUserIds] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

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
      await axios.put(
        `http://localhost:5000/api/workspaces/${workspaceId}/add-users`,
        { userIds },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Users added to workspace successfully!");
      onUpdate(); // Trigger a re-fetch of the data
    } catch (error) {
      console.error("Error adding users", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow-md rounded-lg"
    >
      <h3 className="text-xl font-bold mb-4">Add Users to Workspace</h3>
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
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Users
        </button>
      </div>
    </form>
  );
};

export default AddUser;
