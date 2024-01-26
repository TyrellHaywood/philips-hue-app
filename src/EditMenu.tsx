import React from "react";
import "./EditMenu.scss"; // imports stylesheet;
import { useState, useEffect, ChangeEvent } from "react";
import Light from "./Light";
import Scene from "./Scene";

//define type for props (avoid typescript errors)
interface EditMenuProps {
  toggleSingleLightPower: (lightId: string) => void;
  adjustLightsBrightness: (brightness: number) => void;
  handleBackClick: () => void;
  selectedScene: () => void;
  scenesData: Array<{ id: string; name: string }>;
  lightsData: Array<{
    id: string;
    name: string;
    ct: string;
    xy: [number, number];
    bri: number;
  }>;
}

const EditMenu: React.FC<EditMenuProps> = ({
  toggleSingleLightPower,
  adjustLightsBrightness,
  handleBackClick,
  scenesData,
  lightsData,
  selectedScene,
}) => {
  let sceneName = "";

  Array.isArray(scenesData) &&
    scenesData.map((scene) => {
      sceneName = scene.name;
    });

  return (
    <div className="edit-menu">
      <div className="edit-menu-top">
        <header className="edit-menu-top__header">
          <button className="menu-close-button">
            <span className="material-icons md-light md-36">add</span>
          </button>
          <h1>Edit scene</h1>
          <button className="save-button">
            <h1>SAVE</h1>
          </button>
        </header>
        <div className="edit-menu-top__middle">
          <div className="edit-menu-top__middle__scene-icon"></div>
          <h1>{sceneName}</h1>
          <button className="edit-menu-top__middle__edit-button">
            <span className="material-symbols-outlined md-light md-36">
              edit
            </span>
          </button>
        </div>
        <div className="edit-menu-bottom"></div>
      </div>
    </div>
  );
};

export default EditMenu;
