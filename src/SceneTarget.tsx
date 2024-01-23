import React from "react";
import "./SceneTarget.scss"; // imports stylesheet;
import { useState, useEffect } from "react";

interface SceneTargetProps {
  sceneId: string;
  sceneName: string;
  handleSelectScene: (sceneId: string) => void;
}

const SceneTarget: React.FC<SceneTargetProps> = ({
  sceneId,
  sceneName,
  handleSelectScene,
}) => {
  const handleClick = () => {
    handleSelectScene(sceneId);
  };

  return (
    <button className="scene-component-target" onClick={handleClick}>
      <div className="scene-component-target__button">
        <div className="scene-component-target__button__color">
          <span className="material-icons md-light md-60">play_arrow</span>
        </div>
        <p>TARGET SCENE</p>
      </div>
    </button>
  );
};

export default SceneTarget;
