import React, { useState } from "react";
import axios from "axios";

const TaskTimer = ({ taskId }) => {
  const [isRunning, setIsRunning] = useState(false);

  const handleStartTimer = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/tasks/start-timer/${taskId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setIsRunning(true);
    } catch (error) {
      console.error("Error starting timer", error);
    }
  };

  const handleStopTimer = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/tasks/stop-timer/${taskId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setIsRunning(false);
    } catch (error) {
      console.error("Error stopping timer", error);
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={handleStartTimer}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        disabled={isRunning}
      >
        Start Timer
      </button>
      <button
        onClick={handleStopTimer}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        disabled={!isRunning}
      >
        Stop Timer
      </button>
    </div>
  );
};

export default TaskTimer;
