import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import {jwtDecode} from "jwt-decode"; // To decode JWT token

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5126/api/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token); // Store token

      // Decode JWT to get the role
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role; // Assuming 'role' is in JWT

      // Redirect based on user role
      if (userRole === "Admin") {
        navigate("/dashboard");
      } else if (userRole === "Trainer") {
        navigate("/trainer-dashboard");
      } else {
        navigate("/member-dashboard");
      }
    } catch (error) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-box"]}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Login;
