import React from "react";
import "./Light.scss"; // imports stylesheet;
import { useState, useEffect } from "react";
// scenesData: Array<{ id: string; name: string }>;

const Light = () => {
  return (
    <button className="light-component">
      <div className="light-component__top">
        <div className="light-component__top__icon">
          <span className="material-icons md-light md-72">lightbulb</span>
        </div>
        <p>Light Name</p>
      </div>
      <div className="light-component__bottom"></div>
    </button>
  );
};

export default Light;
