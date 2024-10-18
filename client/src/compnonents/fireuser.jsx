import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const FireUser = () => {
  const [userIds, setUserIds] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
        await axios.delete(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      alert("Users deleted successfully!");
      fetchUsers(); // Re-fetch the user list
    } catch (error) {
      console.error("Error deleting users", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[100%] justify-center align-middle items-center flex-col gap-10 bg-white border-r-slate-900 border-gray-950 shadow-lg p-10 sm:w-[40%]"
    >
      <h3 className="text-xl font-bold mb-4">Delete Users</h3>
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
          className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete User
        </button>
      </div>
    </form>
  );
};

export default FireUser;
