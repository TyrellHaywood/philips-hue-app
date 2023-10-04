import React from "react";
import "./Rooms.scss";

const Rooms = () => {
  return (
    <div className="rooms-page">
      <header className="rooms-header">
        <h1 className="rooms-header__title">Home</h1>
      </header>

      <div className="rooms-title">
        <h2 className="rooms-title__title">Rooms</h2>
      </div>

      <div className="room-component">
        <div className="room-component__information">
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
            <div className="room-component__information__button__circle"></div>
          </div>
        </div>

        <div className="room-component__brightness">
          <div className="room-component__brightness__slider">
            <div className="room-component__brightness__slider__inner">
              <div className="room-component__brightness__slider__inner__circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
