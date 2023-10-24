
//sample scene = cSt4xDglSTLR9lp (homework)
//green bug = g3Y6E1wtnkUZJV8

import React from "react";
import { useState, useEffect } from 'react';

import './App.scss' // imports stylesheet;
import Rooms from './Rooms';
import WelcomeScreen from './WelcomeScreen';

let ipAddress = ''
let idKey = ''

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scenesData, setScenesData] = useState(null);
  const [ipAddress, setIpAddress] = useState(""); // Define ipAddress state
  const [idKey, setIdKey] = useState(""); // Define idKey state

  const handleLoginClick = async () => {
    const API_URL = `https://${ipAddress}/api/${idKey}/scenes`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const scenesById = {} //create an empty object to store scenes by id

      //loop thru scenes and store them in scenesById variable
      for (const sceneId in data) {
        if (data.hasOwnProperty(sceneId)) {
          scenesById[sceneId] = data[sceneId];
        }
      }

      setScenesData(scenesById);
      // setScenesData(data);
      setIsLoggedIn(true);
      console.log(scenesById);  

      // for(let i = 0; i >= scenesById.length; i++){
      //   console.log(scenesById[i])
      // }

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
