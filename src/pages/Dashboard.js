import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [trainers, setTrainers] = useState([]);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Trainers
    axios.get("http://localhost:5126/api/trainers", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(response => setTrainers(response.data))
    .catch(error => console.error("Error fetching trainers", error));

    // Fetch Members
    axios.get("http://localhost:5126/api/members", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(response => setMembers(response.data))
    .catch(error => console.error("Error fetching members", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={styles["dashboard-container"]}>
      <h2>Admin Dashboard</h2>

      <div className={styles.section}>
        <h3>👨‍🏫 Trainers</h3>
        {trainers.length > 0 ? (
          <ul>
            {trainers.map(trainer => (
              <li key={trainer.id}><strong>{trainer.fullName}</strong> - {trainer.email}</li>
            ))}
          </ul>
        ) : (
          <p>No trainers available.</p>
        )}
      </div>

      <div className={styles.section}>
        <h3>🧑‍🤝‍🧑 Members</h3>
        {members.length > 0 ? (
          <ul>
            {members.map(member => (
              <li key={member.id}><strong>{member.fullName}</strong> - {member.email}</li>
            ))}
          </ul>
        ) : (
          <p>No members available.</p>
        )}
      </div>

      <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
