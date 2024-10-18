const Task = require("../models/taskmodel");
const Workspace = require("../models/Workspace");

// Assign a task to a specific member
exports.assignTask = async (req, res) => {
  try {
    const { title, description, assignedTo, workspace, deadline } = req.body;
    const task = new Task({
      title,
      description,
      assignedTo,
      workspace,
      deadline,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ msg: "Error assigning task" });
  }
};

// Get tasks for a specific user
exports.getTasksForUser = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId }).populate(
      "workspace"
    );
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ msg: "Error fetching tasks" });
  }
};

// Start a task timer
exports.startTaskTimer = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    task.timerLogs.push({ startTime: new Date() });
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error("Error starting task timer:", error);
    res.status(500).json({ msg: "Error starting task timer" });
  }
};

// Stop a task timer
exports.stopTaskTimer = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    const currentLog = task.timerLogs[task.timerLogs.length - 1];
    if (!currentLog || currentLog.endTime) {
      return res.status(400).json({ msg: "No active timer found" });
    }
    currentLog.endTime = new Date();
    currentLog.duration = currentLog.endTime - currentLog.startTime;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error("Error stopping task timer:", error);
    res.status(500).json({ msg: "Error stopping task timer" });
  }
};
exports.getTasksForWorkspace = async (req, res) => {
  try {
    const tasks = await Task.find({ workspace: req.params.workspaceId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks for workspace:", error);
    res.status(500).json({ msg: "Error fetching tasks for workspace" });
  }
};
// Get tasks for a specific user within a workspace
exports.getTasksForUserInWorkspace = async (req, res) => {
  try {
    const tasks = await Task.find({
      workspace: req.params.workspaceId,
      assignedTo: req.params.userId,
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks for user in workspace:", error);
    res.status(500).json({ msg: "Error fetching tasks for user in workspace" });
  }
};
