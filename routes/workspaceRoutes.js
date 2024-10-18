const express = require("express");
const router = express.Router();
const {
  createWorkspace,
  assignTeamLead,
  addUsersToWorkspace,
  removeUserFromWorkspace,
  getUserWorkspaces,
  getWorkspace,
  deleteWorkspace,
  getWorkspacesByTeamLead,
  getWorkspacesForUser,
} = require("../controllers/workspaceController");
const taskController = require("../controllers/taskController");

const adminAuth = require("../middleware/middle_admin");
const decodeTokenMiddleware = require("../middleware/decodeTokenMiddleware");

// Admin creates a workspace
router.post("/", adminAuth, createWorkspace);

// Admin assigns team lead and adds users to workspace
router.put("/:id/assign-team-lead", adminAuth, assignTeamLead);
router.put("/:id/add-users", adminAuth, addUsersToWorkspace);
router.put("/:id/remove-user/:userId", adminAuth, removeUserFromWorkspace);

// Get all workspaces for a user
router.get("/", decodeTokenMiddleware, getUserWorkspaces);

// Get a specific workspace (accessible by all roles assigned to the workspace)
router.get("/:id", getWorkspace);
router.delete("/:id", adminAuth, deleteWorkspace);
router.get(
  "/team-lead/:userId",
  decodeTokenMiddleware,
  getWorkspacesByTeamLead
);
router.get("/user/:userId", decodeTokenMiddleware, getWorkspacesForUser);
router.get("/user", decodeTokenMiddleware, getWorkspacesForUser);

// Get tasks for a specific user within a workspace
router.get(
  "/workspace/:workspaceId/user/:userId",
  decodeTokenMiddleware,
  taskController.getTasksForUserInWorkspace
);

module.exports = router;
