import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateWorkspace = ({ onWorkspaceCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const notify = () => toast.success("Success");
  const notifyerror = () => toast.error("Invalid ");
  function handlenotification(newState) {
    newState === 0 ? notify() : notifyerror();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/workspaces",
        { name, description },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Workspace created", response.data);
      handlenotification(0);
      setName("");
      setDescription("");
      onWorkspaceCreated();
    } catch (error) {
      handlenotification(1);
      console.error("Error creating workspace", error);
    }
  };

  return (
    <>
      <ToastContainer containerId={"createworkspace"} />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 bg-white shadow-md rounded-lg"
      >
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Workspace Name"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Workspace
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateWorkspace;
