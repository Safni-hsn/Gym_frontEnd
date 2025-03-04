import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  "./TrainerDashboard.css"; // Ensure correct CSS file

const TrainerDashboard = () => {
  const [members, setMembers] = useState([]);
  const [trainingPlans, setTrainingPlans] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
    fetchTrainingPlans();
  }, []);

  const fetchMembers = () => {
    axios.get("https://gym-backend-ergcdybkbubchjbq.canadacentral-01.azurewebsites.net/api/members", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(response => setMembers(response.data))
    .catch(error => console.error("Error fetching members", error));
  };

  const fetchTrainingPlans = () => {
    axios.get("https://gym-backend-ergcdybkbubchjbq.canadacentral-01.azurewebsites.net/api/training-plans", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(response => setTrainingPlans(response.data))
    .catch(error => console.error("Error fetching training plans", error));
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://gym-backend-ergcdybkbubchjbq.canadacentral-01.azurewebsites.net/api/training-plans", {
        title,
        description,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setTitle("");
      setDescription("");
      alert("Training Plan Created Successfully!");
      fetchTrainingPlans(); // Refresh the list
    } catch (error) {
      console.error("Error creating training plan:", error.response);
      alert("Failed to create training plan. Check console for details.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Trainer Dashboard Header */}
      <h2 className="heading">Trainer Dashboard</h2>

      {/* ✅ Members Section */}
      <div className="section">
        <h3>Members</h3>
        {members.length > 0 ? (
          <ul className="list">
            {members.map(member => (
              <li key={member.id} className="list-item">
                <strong>{member.fullName}</strong> - {member.email}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-data">No members available.</p>
        )}
      </div>

      {/* ✅ Create Training Plan Form */}
      <div className="section">
        <h3>📋 Create Training Plan</h3>
        <form onSubmit={handleCreatePlan} className="form">
          <input
            type="text"
            placeholder="Plan Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit" className="trainerbutton">Create Plan</button>
        </form>
      </div>

      {/* ✅ Training Plans List */}
      <div className="section">
        <h3>Training Plans</h3>
        {trainingPlans.length > 0 ? (
          <div className="gridContainer">
            {trainingPlans.map(plan => (
              <div key={plan.id} className="card">
                <h3>{plan.title}</h3>
                <p className="shortDesc">{plan.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No training plans available.</p>
        )}
      </div>

      {/* ✅ Logout Button */}
      <button onClick={handleLogout} className="logoutButton">Logout</button>
    </div>
  );
};

export default TrainerDashboard;
