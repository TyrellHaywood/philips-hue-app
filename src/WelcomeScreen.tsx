import React from "react";
import "./WelcomeScreen.scss"; // imports stylesheet;

import { useState, useEffect } from "react";

const API_URL =
  "https://192.168.0.235/api/s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt/scenes";

interface WelcomeScreenProps {
  handleLoginClick: () => void; // Define the type of handleLoginClick
}

// uses React.FC to ensure type safety

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ handleLoginClick }) => {
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
          <textarea
            className="ip-address__textarea__text"
            placeholder="ip address"
            contentEditable="true"
            autoFocus
          ></textarea>
        </div>
      </div>

      <div className="id-key">
        <div className="id-key__title">
          <p>id key</p>
        </div>
        <div className="id-key__textarea">
          <textarea
            className="id-key__textarea__text"
            placeholder="authentorization key"
            contentEditable="true"
          ></textarea>
        </div>
      </div>

      <div className="button">
        <button onClick={handleLoginClick}>GO</button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
