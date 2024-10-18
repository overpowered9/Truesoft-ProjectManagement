import React from "react";

const WorkspaceList = ({ workspaces }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Workspaces</h2>
      <ul className="bg-white shadow-md rounded-lg p-4">
        {workspaces.map((workspace) => (
          <li
            key={workspace._id}
            className="border-b last:border-none py-2 px-4 hover:bg-gray-100"
          >
            {workspace.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkspaceList;
