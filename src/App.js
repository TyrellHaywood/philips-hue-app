
//sample scene = cSt4xDglSTLR9lp (homework)
//green bug = g3Y6E1wtnkUZJV8

import React from "react";
import { useState, useEffect } from 'react';

import './App.scss' // imports stylesheet;
import Rooms from './Rooms';
import WelcomeScreen from './WelcomeScreen';

const API_URL = 'https://192.168.0.235/api/s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt/scenes';

let ipAddress = ''
let idKey = ''



const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scenesData, setScenesData] = useState(null);
  const [ipAddress, setIpAddress] = useState(""); // Define ipAddress state
  const [idKey, setIdKey] = useState(""); // Define idKey state

  const handleLoginClick = async () => {
    const correctApiUrl = `https://${ipAddress}/api/${idKey}/scenes`;

    try {
      const response = await fetch(correctApiUrl);
      const data = await response.json();
      setScenesData(data);
      setIsLoggedIn(true);
      console.log(data);
    } catch (error) {
      console.error('Error fetching scenes data:', error);
    }
  };


  return (
    <div className='main-page'>
      
      {isLoggedIn ? (
        <Rooms scenesData={scenesData} />
      ) : (
        <div>
          <WelcomeScreen 
          handleLoginClick={handleLoginClick} 
          ipAddress={ipAddress}
          idKey={idKey}
          setIpAddress={setIpAddress}
          setIdKey={setIdKey}
          />
        </div>
      )}
    </div>
  );
};

export default App;
