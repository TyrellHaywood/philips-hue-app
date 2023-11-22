import React from "react";
import "./Scene.scss"; // imports stylesheet;
import { useState, useEffect } from "react";

const Scene = () => {
  return (
    <div className="scene">
      <button className="scene-button">
        <div className="scene-button__color"></div>
        <p>Scene Name</p>
      </button>
    </div>
  );
};

export default Scene;
