import React from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const WorkspaceList = ({ workspaces, onWorkspaceSelect, fetchWorkspaces }) => {
  const notify = () => toast.success("Success");
  const notifyerror = () => toast.error("Invalid ");
  function handlenotification(newState) {
    newState === 0 ? notify() : notifyerror();
  }

  const handleDelete = async (workspaceId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/workspaces/${workspaceId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchWorkspaces();
      handlenotification(0);
    } catch (error) {
      console.error("Error deleting workspace", error);
      handlenotification(1);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Workspaces</h2>

        <ul className="bg-white shadow-md rounded-lg p-4">
          {workspaces.map((workspace) => (
            <li
              key={workspace._id}
              className="flex flex-row justify-between border-b last:border-none py-2 px-4 hover:bg-gray-100"
              onClick={() => onWorkspaceSelect(workspace._id)}
            >
              {workspace.name}
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the onWorkspaceSelect
                  handleDelete(workspace._id);
                }}
              >
                Delete Workspace
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WorkspaceList;
