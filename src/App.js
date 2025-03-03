import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MemberDashboard from "./pages/MemberDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";

const AppContent = () => {
  const location = useLocation();
  
  // Hide Navbar on dashboards
  const hideNavbar = ["/dashboard", "/trainer-dashboard", "/member-dashboard"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Role-Based Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["Admin"]}><Dashboard /></ProtectedRoute>} />
        <Route path="/trainer-dashboard" element={<ProtectedRoute allowedRoles={["Trainer"]}><TrainerDashboard /></ProtectedRoute>} />
        <Route path="/member-dashboard" element={<ProtectedRoute allowedRoles={["Member"]}><MemberDashboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
