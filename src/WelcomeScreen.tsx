import React from "react";
import "./WelcomeScreen.scss"; // imports stylesheet;

import { useState, useEffect } from "react";

const API_URL =
  "https://192.168.0.235/api/s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt/scenes";

interface WelcomeScreenProps {
  handleLoginClick: (ipAddress: string, idKey: string) => void; // Define the type of handleLoginClick
}

// uses React.FC to ensure type safety

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ handleLoginClick }) => {
  const [ipAddress, setIpAddress] = useState("");
  const [idKey, setIdKey] = useState("");

  const onIpAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIpAddress(e.target.value);
  };

  const onIdKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdKey(e.target.value);
  };

  const handleClick = () => {
    handleLoginClick(ipAddress, idKey);
  };

  return (
    <div className="main-page">
      <header className="main-header">
        <h1 className="main-header__title">Hue for Desktop</h1>
      </header>

      <div className="ip-address">
        <div className="id-key__title">
          <p>ip address</p>
        </div>
        <div className="ip-address__textarea">
          <input
            className="ip-address__textarea__text"
            type="text"
            value={ipAddress}
            placeholder="ip address"
            onChange={onIpAddressChange}
            contentEditable="true"
            autoFocus
          ></input>
        </div>
      </div>

      <div className="id-key">
        <div className="id-key__title">
          <p>id key</p>
        </div>
        <div className="id-key__textarea">
          <input
            className="id-key__textarea__text"
            type="text"
            value={idKey}
            placeholder="authentorization key"
            onChange={onIdKeyChange}
            contentEditable="true"
          ></input>
        </div>
      </div>

      <div className="button">
        <button onClick={handleClick}>GO</button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
