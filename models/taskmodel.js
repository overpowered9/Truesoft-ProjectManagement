const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    deadline: { type: Date },
    timerLogs: [
      {
        startTime: { type: Date },
        endTime: { type: Date },
        duration: { type: Number }, // Duration in milliseconds
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", TaskSchema);
