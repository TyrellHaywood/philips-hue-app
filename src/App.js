//philips hue bridge ip address: 192.168.0.22 (192.168.0.235 - ottawa)
//debugger ip address: https://192.168.0.235/debug/clip.html
//newest user id: s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt

//sample scene = cSt4xDglSTLR9lp (homework)
//green bug = g3Y6E1wtnkUZJV8

import React from "react";
import { useState, useEffect } from 'react';

import './App.scss' // imports stylesheet;
import Home from './Home';
import WelcomeScreen from './WelcomeScreen'

const API_URL = 'https://192.168.0.235/api/s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt/scenes';



const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scenesData, setScenesData] = useState(null);

  
  const handleLoginClick = async () => {
    try {
      const response = await fetch(API_URL);
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
        <Home scenesData={scenesData} />
      ) : (
        <div>
          <WelcomeScreen handleLoginClick={handleLoginClick} />
        </div>
      )}
    </div>
  );
};

export default App;
