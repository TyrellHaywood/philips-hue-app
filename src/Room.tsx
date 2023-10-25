import React from "react";
import { useState } from "react";
import "./Room.scss";

const Room = () => {
  const [isLightOn, setLightOn] = useState(false);

  const powerButton = document.getElementsByClassName(
    "room-component__information__button__circle"
  );

  const toggleLightsPower = () => {
    setLightOn(!isLightOn);
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
            onClick={toggleLightsPower}
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
