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

  return <div className="bg-black text-teal-50">in work</div>;
};

export default Dashboard;
