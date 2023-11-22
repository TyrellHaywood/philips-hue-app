import React from "react";
import "./Light.scss"; // imports stylesheet;
import { useState, useEffect } from "react";

const Light = () => {
  return (
    <div className="light">
      <button className="light__top">
        <div className="light__top__icon">
          <span className="material-icons md-light md-72">lightbulb</span>
        </div>
        <p>Light Name</p>
      </button>
      <div className="light__bottom"></div>
    </div>
  );
};

export default Light;
