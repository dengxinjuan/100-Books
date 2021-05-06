import React from "react";
import "../App.css";
import Button from "./common/Button";
import "./HeroSection.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="hero-container">
      <h1>READ 100 BOOKS</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Link to="/books" className="btn-mobile">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            GET STARTED
          </Button>
        </Link>
        <Link to="/signup" className="btn-mobile">
          <Button
            className="btns"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
            //onClick={console.log("hey")}
          >
            SIGN UP <i class="fas fa-book-reader"></i>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
