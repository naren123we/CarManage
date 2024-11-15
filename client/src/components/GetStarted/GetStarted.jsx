import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./GetStarted.css";

const GetStarted = () => {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Get started with CarManage</span>
          <span className="secondaryText">
            Subscribe and find super attractive price quotes from us.
            <br />
            Find your cars soon
          </span>
          <Link to="/cars">
            <button className="button">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
