import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MemberDashboard.css"; // ✅ Ensure correct CSS import
// ✅ Ensure the image exists

const MemberDashboard = () => {
  const [trainingPlans, setTrainingPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    fetchTrainingPlans();
  }, []);

  const fetchTrainingPlans = () => {
    axios
      .get("https://gym-backend-ergcdybkbubchjbq.canadacentral-01.azurewebsites.net/api/training-plans", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setTrainingPlans(response.data))
      .catch((error) => console.error("Error fetching training plans", error));
  };

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan); // ✅ Open the modal with plan details
  };

  const closeModal = () => {
    setSelectedPlan(null); // ✅ Close modal when clicked outside
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
  className="Member-dashboard-container"
  style={{
    
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  }}
>

      {/* ✅ Logout Button in Top Right Corner */}
      <button className="logoutButton" onClick={handleLogout}>
        Logout
      </button>

      <h2 className="heading">Training Plans</h2>

      {/* ✅ Netflix-Style Scrollable Grid */}
      <div className="gridContainer">
        {trainingPlans.length > 0 ? (
          trainingPlans.map((plan) => (
            <div
              key={plan.id}
              className="card"
              onClick={() => handlePlanClick(plan)}
            >
              <h3>{plan.title}</h3>
              <p className="shortDesc">Click to view details</p>
            </div>
          ))
        ) : (
          <p>No training plans available.</p>
        )}
      </div>

      {/* ✅ Modal for Showing Plan Details */}
      {selectedPlan && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedPlan.title}</h3>
            <p>{selectedPlan.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;
