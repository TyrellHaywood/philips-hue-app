import React from "react";
import "./App.scss"; // imports stylesheet;

import { useState, useEffect } from "react";

const API_URL =
  "https://192.168.0.235/api/s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt/scenes";

const WelcomeScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  const [scenesData, setScenesData] = useState(null);

  const getScenes = async () => {
    try {
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      setScenesData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching scenes data:", error);
    }
  };

  return (
    <div className="main-page">
      <header className="header">
        <h1>Hue for Desktop</h1>
      </header>

      <div className="ip-address">
        <div className="id-key__title">
          <p>ip address</p>
        </div>
        <div className="ip-address__textarea"></div>
      </div>

      <div className="id-key">
        <div className="id-key__title">
          <p>id key</p>
        </div>
        <div className="id-key__textarea"></div>
      </div>

      <div className="button">
        <button
          onClick={() => {
            getScenes();
            handleLoginClick();
          }}
        >
          GO
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
