import React from "react";
import "./EditMenu.scss"; // imports stylesheet;
import { useState, useEffect, ChangeEvent } from "react";
import Light from "./Light";
import Scene from "./Scene";

//define type for props (avoid typescript errors)
interface EditMenuProps {
  toggleSingleLightPower: (lightId: string) => void;
  adjustLightsBrightness: (brightness: number) => void;
  handleEditClose: () => void;
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
  handleEditClose,
  scenesData,
  lightsData,
  selectedScene,
}) => {
  const [brightness, setBrightness] = useState(0); // default brightness value
  const [sliderWidth, setSliderWidth] = useState<number>(100);

  let sceneName = "";
  Array.isArray(scenesData) &&
    scenesData.map((scene) => {
      sceneName = scene.name;
    });

  const handleBrightnessChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newBrightness = Number(event.target.value);
    setBrightness(newBrightness);
    adjustLightsBrightness(newBrightness);

    // update slider width
    const thumbPosition = (newBrightness - 0) / (255 - 0);
    const width = thumbPosition * 100;
    setSliderWidth(width);
  };

  return (
    <div className="edit-menu">
      <div className="edit-menu-top">
        <header className="edit-menu-top__header">
          <button className="menu-close-button" onClick={handleEditClose}>
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
        <div className="edit-menu-top__bottom">
          <h1>Scene brightness</h1>
          <p>90%</p>
          <div className="edit-menu-top__bottom__brightness-slider">
            <input
              type="range"
              min="0"
              max="255" // adjust the max value based on light's maximum brightness
              value={brightness}
              onChange={handleBrightnessChange}
              className="edit-menu-top__bottom__brightness-slider__input"
              style={
                { "--slider-width": `${sliderWidth}%` } as React.CSSProperties
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMenu;
