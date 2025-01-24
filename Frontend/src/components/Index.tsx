import React from "react";
import { Link } from "react-router-dom";
import "../styles/Index.css";
import realisticHeart from "../assets/realistic-heart.svg"; // Import realistic heart SVG or animation

const Index: React.FC = () => (
  <div className="index-container">
    <div className="background-gradient"></div>
    <div className="content">
      <div className="heart-container">
        <img
          src={realisticHeart}
          alt="Realistic heart animation"
          className="animate-heartbeat realistic-heart"
        />
      </div>
      <h1 className="welcome-text">Welcome to the Cardiac Health Assessment</h1>
      <div className="text-container">
        <Link to="/questionnaire" className="btn">
          Start Questionnaire
        </Link>
      </div>
    </div>
  </div>
);

export default Index;