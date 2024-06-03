import React from "react";
import "./Light.scss"; // imports stylesheet;
import { useState, useEffect } from "react";
// scenesData: Array<{ id: string; name: string }>;

interface lightProps {
  lightId: string;
  lightName: string;
  lightCT: string;
  lightXY: [number, number];
  lightBri: number;
  toggleSingleLightPower: (lightId: string) => void;
  lightColors: { [key: string]: string };
}

const Light: React.FC<lightProps> = ({
  lightId,
  lightName,
  lightCT,
  lightXY,
  lightBri,
  toggleSingleLightPower,
  lightColors,
}) => {
  const [isLightOn, setLightOn] = useState(false);

  const handleToggleLights = () => {
    setLightOn(!isLightOn);
    toggleSingleLightPower(lightId); // call function from the prop
  };

  return (
    <button
      className="light-component"
      style={{ backgroundColor: `${lightColors[lightId]}` }}
    >
      <div className="light-component__top">
        <div className="light-component__top__icon">
          <span className="material-icons md-light md-72">lightbulb</span>
        </div>
        <p>{lightName}</p>
      </div>
      <div className="light-component__bottom">
        <div className="light-component__bottom__light-button">
          <button
            className={`light-component__bottom__light-button__circle ${
              isLightOn ? "on" : "off"
            }`}
            onClick={handleToggleLights}
          ></button>
        </div>
      </div>
    </button>
  );
};

export default Light;
