import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("Role");
    if (!role) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="bg-black text-teal-50">
      <h1>Welcome to the Dashboard</h1>
      <p>This is the home page of the project management application.</p>
    </div>
  );
};

export default Dashboard;
