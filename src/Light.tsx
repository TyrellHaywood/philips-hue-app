import React from "react";
import "./Light.scss"; // imports stylesheet;
import { useState, useEffect } from "react";

const Light = () => {
  return (
    <div className="light">
      <button className="light__top"></button>
      <div className="light__bottom"></div>
    </div>
  );
};

export default Light;
