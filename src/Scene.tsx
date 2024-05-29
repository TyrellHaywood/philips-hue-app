import React from "react";
import "./Scene.scss"; // imports stylesheet;
import { useState, useEffect } from "react";

interface SceneProps {
  sceneId: string;
  sceneName: string;
  handleSelectScene: (sceneId: string) => void;
  handleEditScene: () => void;
  lightColors: { [key: string]: string };
  lightsData: {
    id: string;
    name: string;
    on: boolean;
    bri: number;
    ct: number;
    hexValue: string;
    xy: number[];
  }[];
  scenesData: Array<{
    id: string;
    name: string;
    lightsData: Array<{
      id: string;
      name: string;
      on: boolean;
      bri: number;
      ct: number;
      hexValue: string;
      xy: Array<number>;
    }>;
  }>;
}

const Scene: React.FC<SceneProps> = ({
  sceneId,
  sceneName,
  lightColors,
  lightsData,
  scenesData,
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
              lightsData[0]?.hexValue ?? "#ffffff"
            } 28.79%, ${lightsData[1]?.hexValue ?? "#ffffff"} 88.97%)`,
          }}
        ></div>
        <p>{sceneName}</p>
      </div>
    </button>
  );
};

export default Scene;
