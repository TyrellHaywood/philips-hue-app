import React from "react";
import "./EditMenu.scss"; // imports stylesheet;
import { useState, useEffect, ChangeEvent } from "react";
import Light from "./Light";

//define type for props (avoid typescript errors)
interface EditMenuProps {
  toggleSingleLightPower: (lightId: string) => void;
  adjustLightsBrightness: (brightness: number) => void;
  handleBackClick: () => void;
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
}) => {
  return (
    <div className="edit-menu">
      <div className="edit-menu-top">
        <header className="edit-menu-top__header">
          <button className="menu-close-button">
            <span className="material-icons md-light md-36">add</span>
          </button>
          <h1>Edit Scene</h1>
          <button className="save-button">
            <p>SAVE</p>
          </button>
        </header>
        <div className="edit-menu-top__main-content"></div>
      </div>
    </div>
  );
};

export default EditMenu;
