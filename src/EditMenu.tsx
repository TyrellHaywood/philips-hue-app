import React from "react";
import "./EditMenu.scss"; // imports stylesheet;
import { useState, useEffect, ChangeEvent } from "react";
import Light from "./Light";

//define type for props (avoid typescript errors)
interface EditMenuProps {
  toggleSingleLightPower: (lightId: string) => void;
  adjustLightsBrightness: (brightness: number) => void;
  handleEditClose: () => void;
  selectedScene: () => void;
  editMenu: () => void;
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
  editMenu,
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
      <div className="edit-menu-upper-top">
        <header className="edit-menu-upper-top__header">
          <button className="menu-close-button" onClick={handleEditClose}>
            <span className="material-icons md-light md-36">add</span>
          </button>
          <h1>Edit scene</h1>
          <button className="save-button">
            <h1>SAVE</h1>
          </button>
        </header>
        <div className="edit-menu-upper-top__middle">
          <div className="edit-menu-upper-top__middle__scene-icon"></div>
          <h1>{sceneName}</h1>
          <button className="edit-menu-upper-top__middle__edit-button">
            <span className="material-symbols-outlined md-light md-36">
              edit
            </span>
          </button>
        </div>
        <div className="edit-menu-upper-top__bottom">
          <div className="edit-menu-upper-top__bottom__text">
            <h1>Scene brightness</h1>
            <p>90%</p>
          </div>
          <div className="edit-menu-upper-top__bottom__brightness-slider">
            <input
              type="range"
              min="0"
              max="255" // adjust the max value based on light's maximum brightness
              value={brightness}
              onChange={handleBrightnessChange}
              className="edit-menu-upper-top__bottom__brightness-slider__input"
              style={
                { "--slider-width": `${sliderWidth}%` } as React.CSSProperties
              }
            />
          </div>
        </div>
      </div>
      <div className="edit-menu-upper-bottom">
        <div className="edit-menu-upper-bottom__header">
          <h2>DYNAMIC SCENES</h2>
          <button className="edit-menu-upper-bottom__header__drop-down">
            <span className="material-symbols-outlined md-36">
              arrow_drop_down_circle
            </span>
          </button>
        </div>
        <div className="edit-menu-upper-bottom__dynamic-settings">
          <div className="edit-menu-upper-bottom__dynamic-settings__top">
            <h1>Dynamic Speed</h1>
            <p>7 - Medium</p>
          </div>
          <div className="edit-menu-upper-bottom__dynamic-settings__div"></div>
          <div className="edit-menu-upper-bottom__dynamic-settings__bottom">
            <div className="edit-menu-upper-bottom__dynamic-settings__bottom__text">
              <h1>Auto-play</h1>
              <p>Set dynamic as default</p>
            </div>
            <div className="edit-menu-upper-bottom__dynamic-settings__bottom__power">
              <button className="edit-menu-upper-bottom__dynamic-settings__bottom__power__circle"></button>
            </div>
          </div>
        </div>
      </div>
      <div className="edit-menu-lower">
        <header className="edit-menu-lower__header">
          <h1>Lights</h1>
        </header>
        <div className="edit-menu-lower__lights">
          {Array.isArray(lightsData) &&
            lightsData.map((light) => (
              <Light
                lightId={light.id}
                lightName={light.name}
                lightCT={light.ct}
                lightXY={light.xy}
                lightBri={light.bri}
                toggleSingleLightPower={toggleSingleLightPower}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default EditMenu;
