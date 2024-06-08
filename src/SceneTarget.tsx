import React from "react";
import "./SceneTarget.scss"; // imports stylesheet;
import { useState, useEffect } from "react";

interface SceneTargetProps {
  sceneId: string;
  sceneName: string;
  handleSelectScene: (sceneId: string) => void;
  handleEditScene: () => void;
  lightColors: { [key: string]: string };
  toggleDynamicScene: () => void;
}

const SceneTarget: React.FC<SceneTargetProps> = ({
  sceneId,
  sceneName,
  lightColors,
  handleSelectScene,
  handleEditScene,
  toggleDynamicScene,
}) => {
  const handleClick = () => {
    handleSelectScene(sceneId);
  };

  const handleEditClick = () => {
    handleEditScene();
  };

  const handleLightEffect = () => {
    toggleDynamicScene();
  };

  return (
    <div className="scene-component-target">
      <div
        className="scene-component-target__button"
        style={{
          background: `linear-gradient(90deg, ${lightColors.light0} 28.79%, ${lightColors.light1} 88.97%)`,
        }}
      >
        <button
          className="scene-component-target__button__color"
          onClick={handleLightEffect}
        >
          <span className="material-icons md-light md-60">play_arrow</span>
        </button>
        <p>{sceneName}</p>
      </div>
      <div className="scene-component-target__buttons-container">
        <button
          className="scene-component-target__buttons-container__edit-button"
          onClick={handleEditClick}
        >
          <span className="material-symbols-outlined md-light md-36">edit</span>
        </button>
        <button className="scene-component-target__buttons-container__options-button">
          <div className="scene-component-target__buttons-container__options-button__more-options"></div>
          <div className="scene-component-target__buttons-container__options-button__more-options"></div>
          <div className="scene-component-target__buttons-container__options-button__more-options"></div>
        </button>
      </div>
    </div>
  );
};

export default SceneTarget;
