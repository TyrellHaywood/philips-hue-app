import React from "react";
import "./Scene.scss"; // imports stylesheet;
import { useState, useEffect } from "react";

interface SceneProps {
  sceneName: string;
}

const Scene: React.FC<SceneProps> = ({ sceneName }) => {
  return (
    <div className="scene">
      <button className="scene-button">
        <div className="scene-button__color">
          <span className="material-icons md-light md-60">play_arrow</span>
        </div>
        <p>{sceneName}</p>
      </button>
    </div>
  );
};

export default Scene;
