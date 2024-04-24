import React from "react";
import "./Scene.scss"; // imports stylesheet;
import { useState, useEffect } from "react";

interface SceneProps {
  sceneId: string;
  sceneName: string;
  handleSelectScene: (sceneId: string) => void;
  handleEditScene: () => void;
  lightColors: { [key: string]: string };
}

const Scene: React.FC<SceneProps> = ({
  sceneId,
  sceneName,
  lightColors,
  handleSelectScene,
  handleEditScene,
}) => {
  const handleClick = () => {
    handleSelectScene(sceneId);
  };

  return (
    <button className="scene-component" onClick={handleClick}>
      <div className="scene-component__button">
        <div
          className="scene-component__button__color"
          style={{
            background: `linear-gradient(90deg, ${
              lightColors[`light${sceneId}`]
            } 28.79%, ${lightColors[`light${sceneId}`]} 88.97%)`,
          }}
        ></div>
        <p>{sceneName}</p>
      </div>
    </button>
  );
};

export default Scene;
