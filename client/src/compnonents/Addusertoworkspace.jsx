import React, { useState, useEffect } from "react";
import axios from "axios";

const AddUser = ({ workspaceId }) => {
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
        `/api/workspaces/${workspaceId}/add-users`,
        { userIds },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Users added to workspace successfully!");
    } catch (error) {
      console.error("Error adding users", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Users to Workspace</h3>
      {users.map((user) => (
        <div key={user._id}>
          <input type="checkbox" value={user._id} onChange={handleChange} />
          <label>{user.name}</label>
        </div>
      ))}
      <button type="submit">Add Users</button>
    </form>
  );
};

export default AddUser;
