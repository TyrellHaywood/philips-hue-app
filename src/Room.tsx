import React from "react";
import { useState } from "react";
import "./Room.scss";

//define type for props (avoid typescript errors)
interface RoomProps {
  toggleLightsPower: () => void;
  handleRoomClick: () => void;
  adjustLightsBrightness: (brightness: number) => void;
  // lightsData: Array<any>; // Add lightsData prop
}

const Room: React.FC<RoomProps> = ({
  toggleLightsPower,
  adjustLightsBrightness,
  handleRoomClick,
  // lightsData,
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
    <button className="room-component" onClick={handleRoomClick}>
      {/* room info */}
      <div
        className={`room-component__information ${
          isLightOn ? "lights-on" : "lights-off"
        }`}
      >
        <img className="room-component__information__img"></img>
        <div className="room-component__information__title">
          <h1 className="room-component__information__title__title">
            Tyrell's Room
          </h1>
          <h2 className="room-component__information__title__subtitle">
            lights are on
          </h2>
        </div>
        <div className="room-component__information__button">
          <button
            className={`room-component__information__button__circle ${
              isLightOn ? "on" : "off"
            }`}
            onClick={handleToggleLights}
          ></button>
        </div>
      </div>
      {/* room brightness */}
      <div className="room-component__brightness">
        <div className="room-component__brightness__slider">
          <input
            type="range"
            min="0"
            max="255" // Adjust the max value based on light's maximum brightness
            value={brightness}
            onChange={handleBrightnessChange}
            className="room-component__brightness__slider__input"
            style={
              { "--slider-width": `${sliderWidth}%` } as React.CSSProperties
            }
          />
        </div>
      </div>
    </button>
  );
};

export default Room;
