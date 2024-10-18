import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = ({ userId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tasks/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTasks();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      <ul className="bg-white shadow-md rounded-lg p-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="border-b last:border-none py-2 px-4 hover:bg-gray-100"
          >
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
            <p>Start Date: {new Date(task.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(task.endDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
