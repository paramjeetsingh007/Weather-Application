import React from "react";
import "./Dashboard.css";

const Dashboard = ({ onStart }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="fade-in">Check the Weather of Your City</h1>
        <p className="fade-in delay">Get real-time weather updates instantly!</p>
        <button className="start-btn fade-in delay-2" onClick={onStart}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
