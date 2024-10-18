const Workspace = require("../models/Workspace");
const User = require("../models/User");
const Task = require("../models/taskmodel");
// Create a new workspace
exports.createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newWorkspace = new Workspace({
      name,
      description,
      createdBy: req.user.userId,
    });

    const savedWorkspace = await newWorkspace.save();
    res.status(201).json(savedWorkspace);
  } catch (error) {
    res.status(500).json({ msg: "Error creating workspace" });
  }
};

// Assign a team lead to the workspace
exports.assignTeamLead = async (req, res) => {
  try {
    const { teamLeadId } = req.body;
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({ msg: "Workspace not found" });
    }

    workspace.teamLead = teamLeadId;
    await workspace.save();

    res.status(200).json(workspace);
  } catch (error) {
    res.status(500).json({ msg: "Error assigning team lead" });
  }
};

// Add users to a workspace
exports.addUsersToWorkspace = async (req, res) => {
  try {
    const { userIds } = req.body;
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({ msg: "Workspace not found" });
    }

    workspace.members.push(...userIds);
    await workspace.save();

    res.status(200).json(workspace);
  } catch (error) {
    res.status(500).json({ msg: "Error adding users to workspace" });
  }
};

// Remove a user from a workspace
exports.removeUserFromWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({ msg: "Workspace not found" });
    }

    workspace.members.pull(req.params.userId);
    await workspace.save();

    res.status(200).json(workspace);
  } catch (error) {
    res.status(500).json({ msg: "Error removing user from workspace" });
  }
};

// Get all workspaces for a user
exports.getUserWorkspaces = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    let workspaces;

    if (user.role === "admin") {
      workspaces = await Workspace.find();
    } else {
      workspaces = await Workspace.find({ members: userId });
    }
    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching workspaces" });
  }
};

// Get a specific workspace
exports.getWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id)
      .populate("teamLead", "name email")
      .populate("members", "name email")
      .populate("tasks", "title description");

    if (!workspace) {
      return res.status(404).json({ msg: "Workspace not found" });
    }

    res.status(200).json(workspace);
  } catch (error) {
    console.error("Error fetching workspace:", error);

    res.status(500).json({ msg: "Error fetching workspace" });
  }
};
exports.deleteWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findByIdAndDelete(req.params.id);

    if (!workspace) {
      return res.status(404).json({ msg: "Workspace not found" });
    }

    res.status(200).json({ msg: "Workspace deleted successfully" });
  } catch (error) {
    console.error("Error deleting workspace:", error);
    res.status(500).json({ msg: "Error deleting workspace" });
  }
};
exports.getWorkspacesByTeamLead = async (req, res) => {
  try {
    console.log(req.user.userId);
    const workspaces = await Workspace.find({ teamLead: req.user.userId });
    console.log(workspaces);
    if (!workspaces || workspaces.length === 0) {
      return res
        .status(404)
        .json({ msg: "No workspaces found for this team lead" });
    }

    res.status(200).json(workspaces);
  } catch (error) {
    console.error("Error fetching workspaces by team lead:", error);
    res.status(500).json({ msg: "Error fetching workspaces by team lead" });
  }
};
