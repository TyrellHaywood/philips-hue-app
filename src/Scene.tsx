import React from "react";
import "./Scene.scss"; // imports stylesheet;
import { useState, useEffect } from "react";

interface SceneProps {
  sceneId: string;
  sceneName: string;
  handleSelectScene: (sceneId: string) => void;
  handleEditScene: () => void;
}

const Scene: React.FC<SceneProps> = ({
  sceneId,
  sceneName,
  handleSelectScene,
  handleEditScene,
}) => {
  const handleClick = () => {
    handleSelectScene(sceneId);
  };

  return (
    <button className="scene-component" onClick={handleClick}>
      <div className="scene-component__button">
        <div className="scene-component__button__color"></div>
        <p>{sceneName}</p>
      </div>
    </button>
  );
};

export default Scene;
