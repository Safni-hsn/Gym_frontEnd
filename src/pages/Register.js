import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css"; // Import CSS module

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Member"); // Default role
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5126/api/auth/register", {
        fullName,
        email,
        password,
        role
      });

      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Registration failed. Try again.");
    }
  };

  return (
    <div className={styles["register-container"]}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Trainer">Trainer</option>
          <option value="Member">Member</option>
        </select>

        <button type="submit">Register</button>
      </form>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default Register;
