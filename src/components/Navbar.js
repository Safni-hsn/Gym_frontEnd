import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"; // Import CSS module

const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <h2>Gym Management System</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      {/* This prevents content from going behind the navbar */}
      <div className={styles["body-padding"]}></div>
    </>
  );
};

export default Navbar;
