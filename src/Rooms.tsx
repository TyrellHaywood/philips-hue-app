import React from "react";
import "./Rooms.scss";
import Room from "./Room";

const Rooms = () => {
  return (
    <div className="rooms-page">
      <header className="rooms-header">
        <h1 className="rooms-header__title">Home</h1>
      </header>

      <div className="rooms-title">
        <h2 className="rooms-title__title">Rooms</h2>
      </div>
      <div className="room-section">
        {/*  */}
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
      </div>
      {/* <div className="room-scrollbar">
        <div className="room-scrollbar__bar">
          <div className="room-scrollbar__bar__cursor"></div>
        </div>
      </div> -- was originally inside `room-section`, probably dont need. keeping just in case*/}
      {/*  */}
    </div>
  );
};

export default Rooms;
