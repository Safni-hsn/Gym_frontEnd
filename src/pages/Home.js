import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css"; // Import CSS module

const Home = () => {
  return (
    <div
      className={styles["home-container"]}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/gym-bg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1>Welcome to Gym Management System</h1>
        <p>Track your fitness journey, manage trainers, and join exclusive workout programs.</p>
        <div className={styles.buttons}>
          <Link to="/register"><button>Join Now</button></Link>
          <Link to="/login"><button>Login</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
