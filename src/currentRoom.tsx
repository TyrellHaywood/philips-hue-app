import React from "react";
import { SyntheticEvent, KeyboardEvent } from "react";
import "./CurrentRoom.scss"; // imports stylesheet;
import { useState, useEffect, ChangeEvent } from "react";
import Scene from "./Scene";
import Light from "./Light";
import SceneTarget from "./SceneTarget";

//define type for props (avoid typescript errors)
interface CurrentRoomProps {
  toggleLightsPower: () => void;
  toggleSingleLightPower: (lightId: string) => void;
  adjustLightsBrightness: (brightness: number) => void;
  handleBackClick: () => void;
  scenesData: Array<{ id: string; name: string }>;
  lightsData: Array<{ id: string; name: string }>;
  handleSelectScene: (sceneId: string) => void;
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchScene: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | KeyboardEvent<HTMLInputElement>,
    searchValue: string
  ) => void;
  selectedScene: () => void;
}

const CurrentRoom: React.FC<CurrentRoomProps> = ({
  toggleLightsPower,
  toggleSingleLightPower,
  adjustLightsBrightness,
  handleBackClick,
  scenesData,
  lightsData,
  handleSelectScene,
  handleSearchScene,
  selectedScene,
}) => {
  const [isLightOn, setLightOn] = useState(false);
  const [brightness, setBrightness] = useState(0); // default brightness value
  const [sliderWidth, setSliderWidth] = useState<number>(100);
  const [searchValue, setSearchValue] = useState(""); // search bar text onChange

  const handleToggleLights = () => {
    setLightOn(!isLightOn);
    toggleLightsPower(); //call function from the prop
  };

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

  // event handler for input changes in search bar
  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    console.log(event.target.value);
  };

  const handleSearchKeyPress = (
    event: KeyboardEvent<HTMLInputElement>
  ): void => {
    // Prevent the default action for "Enter" key to avoid form submission
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchScene(event, searchValue);
    }
  };

  return (
    <div className="current-room">
      <header className="current-room-header">
        <div
          className={`current-room-header__top ${
            isLightOn ? "lights-on" : "lights-off"
          }`}
        >
          <div className="current-room-header__top__round-button back-button">
            <button
              className="back-button__arrow-button"
              onClick={handleBackClick}
            >
              <span className="material-icons md-light md-36">arrow_back</span>
            </button>
          </div>
          <h1>Tyrell's Room</h1>
          <div className="current-room-header__top__round-button edit-button">
            <button className="btn">
              <div className="edit-button__more-options"></div>
              <div className="edit-button__more-options"></div>
              <div className="edit-button__more-options"></div>
            </button>
          </div>
          <div className="current-room-header__top__light-button">
            <button
              className={`current-room-header__top__light-button__circle ${
                isLightOn ? "on" : "off"
              }`}
              onClick={handleToggleLights}
            ></button>
          </div>
        </div>
        <div className="current-room-header__bottom">
          <div className="current-room-header__bottom__brightness-slider">
            <input
              type="range"
              min="0"
              max="255" // adjust the max value based on light's maximum brightness
              value={brightness}
              onChange={handleBrightnessChange}
              className="current-room-header__bottom__brightness-slider__input"
              style={
                { "--slider-width": `${sliderWidth}%` } as React.CSSProperties
              }
            />
          </div>
        </div>
      </header>
      <div className="current-room-content">
        <div className="current-room-content__mid-header">
          <p>MY SCENES</p>
          <div className="current-room-content__mid-header__search-bar">
            <button
              className="current-room-content__mid-header__search-bar__button"
              onClick={(event) => handleSearchScene(event, searchValue)}
            >
              <span className="material-icons md-light md-36">search</span>
            </button>
            <input
              type="text"
              placeholder="Search for your scene"
              value={searchValue}
              onChange={handleSearchInput}
              onKeyDown={handleSearchKeyPress}
            />
          </div>
          <div className="current-room-content__mid-header__new-scene">
            <button>
              <span className="material-icons md-light md-36">add</span>
            </button>
          </div>
        </div>
        <div className="current-room-content__scenes">
          {/* <SceneTarget
            sceneId="1"
            sceneName="Ty"
            handleSelectScene={handleSelectScene}
          /> */}
          {Array.isArray(scenesData) &&
            scenesData.map((scene) => {
              const isSelected =
                selectedScene && (selectedScene as any).id === scene.id;
              // console.log(`Scene ${scene.id} is selected: ${isSelected}`);

              return isSelected ? (
                <SceneTarget
                  key={scene.id}
                  sceneId={scene.id}
                  sceneName={scene.name}
                  handleSelectScene={handleSelectScene}
                />
              ) : (
                <Scene
                  key={scene.id}
                  sceneId={scene.id}
                  sceneName={scene.name}
                  handleSelectScene={handleSelectScene}
                />
              );
            })}
        </div>
        <div className="current-room-content__lights-title">
          <p>LIGHTS</p>
        </div>
        <div className="current-room-content__lights">
          {Array.isArray(lightsData) &&
            lightsData.map((light) => (
              <Light
                lightId={light.id}
                lightName={light.name}
                toggleSingleLightPower={toggleSingleLightPower}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentRoom;
