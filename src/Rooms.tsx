import React from "react";
import { useState, useEffect } from "react";

import "./Rooms.scss";
import Room from "./Room";

//define type for props (avoid typescript errors)
interface RoomProps {
  toggleLightsPower: () => void;
  handleRoomClick: () => void;
  adjustLightsBrightness: (brightness: number) => void;
  lightColors: { [key: string]: string };
}

const Rooms: React.FC<RoomProps> = ({
  toggleLightsPower,
  adjustLightsBrightness,
  handleRoomClick,
  lightColors,
}) => {
  const [roomSelected, setRoomSelected] = useState(false);

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
        <Room
          toggleLightsPower={toggleLightsPower}
          adjustLightsBrightness={adjustLightsBrightness}
          handleRoomClick={handleRoomClick}
          lightColors={lightColors}
        />
        <Room
          toggleLightsPower={toggleLightsPower}
          adjustLightsBrightness={adjustLightsBrightness}
          handleRoomClick={handleRoomClick}
          lightColors={lightColors}
        />
        <Room
          toggleLightsPower={toggleLightsPower}
          adjustLightsBrightness={adjustLightsBrightness}
          handleRoomClick={handleRoomClick}
          lightColors={lightColors}
        />
        <Room
          toggleLightsPower={toggleLightsPower}
          adjustLightsBrightness={adjustLightsBrightness}
          handleRoomClick={handleRoomClick}
          lightColors={lightColors}
        />
        <Room
          toggleLightsPower={toggleLightsPower}
          adjustLightsBrightness={adjustLightsBrightness}
          handleRoomClick={handleRoomClick}
          lightColors={lightColors}
        />
        <Room
          toggleLightsPower={toggleLightsPower}
          adjustLightsBrightness={adjustLightsBrightness}
          handleRoomClick={handleRoomClick}
          lightColors={lightColors}
        />
        <Room
          toggleLightsPower={toggleLightsPower}
          adjustLightsBrightness={adjustLightsBrightness}
          handleRoomClick={handleRoomClick}
          lightColors={lightColors}
        />
      </div>
    </div>
  );
};

export default Rooms;
