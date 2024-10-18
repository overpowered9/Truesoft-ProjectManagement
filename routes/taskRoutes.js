const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const decodeTokenMiddleware = require("../middleware/decodeTokenMiddleware");
const adminAuth = require("../middleware/middle_admin");

// Assign a task to a specific member
router.post("/assign", decodeTokenMiddleware, taskController.assignTask);

// Get tasks for a specific user
router.get(
  "/user/:userId",
  decodeTokenMiddleware,
  taskController.getTasksForUser
);

// Start a task timer
router.post(
  "/start-timer/:taskId",
  decodeTokenMiddleware,
  taskController.startTaskTimer
);

// Stop a task timer
router.post(
  "/stop-timer/:taskId",
  decodeTokenMiddleware,
  taskController.stopTaskTimer
);
// Get tasks for a specific workspace
router.get(
  "/workspace/:workspaceId",
  decodeTokenMiddleware,
  taskController.getTasksForWorkspace
);

module.exports = router;
