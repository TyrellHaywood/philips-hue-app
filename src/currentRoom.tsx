import React from "react";
import "./CurrentRoom.scss"; // imports stylesheet;
import { useState, useEffect } from "react";

//define type for props (avoid typescript errors)
interface CurrentRoomProps {
  toggleLightsPower: () => void;
  adjustLightsBrightness: (brightness: number) => void;
}

const CurrentRoom: React.FC<CurrentRoomProps> = ({
  toggleLightsPower,
  adjustLightsBrightness,
}) => {
  const [isLightOn, setLightOn] = useState(false);
  const [brightness, setBrightness] = useState(0); // Default brightness value
  const [sliderWidth, setSliderWidth] = useState<number>(100);

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

  return (
    <div className="current-room">
      <header className="current-room-header">
        <div className="current-room-header__top">
          <div className="current-room-header__top__round-button back-button">
            <button className="back-button__arrow-button">
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
              max="255" // Adjust the max value based on light's maximum brightness
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
    </div>
  );
};

export default CurrentRoom;
