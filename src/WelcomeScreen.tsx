import React from "react";
import "./WelcomeScreen.scss"; // imports stylesheet;
import "./lightVariables.scss";

import { useState, useEffect } from "react";

const API_URL =
  "https://192.168.0.235/api/s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt/scenes";

interface WelcomeScreenProps {
  handleLoginClick: () => void; // Define the type of handleLoginClick
  ipAddress: string; //define type of ipAddress
  idKey: string; //define type of idKey
  setIpAddress: (value: string) => void; //define type of setIpAddress
  setIdKey: (value: string) => void; //define type of setIdKey
}

// uses React.FC to ensure type safety

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  handleLoginClick,
  ipAddress, // Use the prop directly
  idKey, // Use the prop directly
  setIpAddress, // Use the prop directly
  setIdKey, // Use the prop directly
}) => {
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
            placeholder="ip address"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
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
            placeholder="authentorization key"
            value={idKey}
            onChange={(e) => setIdKey(e.target.value)}
          ></input>
        </div>
      </div>

      <div className="button">
        <button onClick={handleLoginClick}>GO</button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
