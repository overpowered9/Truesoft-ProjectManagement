const Workspace = require("../models/Workspace");

// Get workspaces for a specific user
exports.getWorkspacesForUser = async (req, res) => {
  try {
    const workspaces = await Workspace.find({ members: req.params.userId });
    res.status(200).json(workspaces);
  } catch (error) {
    console.error("Error fetching workspaces for user:", error);
    res.status(500).json({ msg: "Error fetching workspaces for user" });
  }
};
