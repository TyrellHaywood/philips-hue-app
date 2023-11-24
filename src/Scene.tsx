import React from "react";
import "./Scene.scss"; // imports stylesheet;
import { useState, useEffect } from "react";

interface SceneProps {
  sceneId: string;
  sceneName: string;
  handleSelectScene: (sceneId: string) => void;
}

const Scene: React.FC<SceneProps> = ({
  sceneId,
  sceneName,
  handleSelectScene,
}) => {
  const handleClick = () => {
    handleSelectScene(sceneId);
  };

  return (
    <div className="scene">
      <button className="scene-button" onClick={handleClick}>
        <div className="scene-button__color">
          <span className="material-icons md-light md-60">play_arrow</span>
        </div>
        <p>{sceneName}</p>
      </button>
    </div>
  );
};

export default Scene;
