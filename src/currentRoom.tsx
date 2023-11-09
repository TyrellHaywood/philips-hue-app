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

  const handleToggleLights = () => {
    setLightOn(!isLightOn);
    toggleLightsPower(); //call function from the prop
  };

  return (
    <div className="current-room">
      <header className="current-room-header">
        <div className="current-room-header__top">
          <div className="current-room-header__top__round-button back-button">
            <button>back</button>
          </div>
          <h1>Tyrell's Room</h1>
          <div className="current-room-header__top__round-button edit-button">
            <button>edit</button>
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
        <div className="current-room-header__bottom"></div>
      </header>
    </div>
  );
};

export default CurrentRoom;
