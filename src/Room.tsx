import React from "react";
import { useState } from "react";
import "./Room.scss";

//define type for props (avoid typescript errors)
interface RoomProps {
  toggleLightsPower: () => void;
}

const Room: React.FC<RoomProps> = ({ toggleLightsPower }) => {
  const [isLightOn, setLightOn] = useState(false);

  const handleToggleLights = () => {
    setLightOn(!isLightOn);
    toggleLightsPower(); //call function from the prop
  };

  return (
    <div className="room-component">
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
          <div className="room-component__brightness__slider__inner">
            <div className="room-component__brightness__slider__inner__circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
