const User = require("../models/User");
const Workspace = require("../models/Workspace");
exports.getallUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ msg: "Error fetching users" });
  }
};

exports.getallUsersinworkspace = async (req, res) => {
  try {
    const workspaceId = req.params.id;

    const workspace = await Workspace.findById(workspaceId)
      .populate("teamLead", "name email")
      .populate("members", "name email")
      .populate("tasks", "title description");

    const users = workspace.members;
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users in workspace:", error);
    res.status(500).json({ msg: "Error fetching users in workspace" });
  }
};
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ msg: "Error deleting user" });
  }
};
