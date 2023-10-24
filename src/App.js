
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
  const [groupData, setGroupData] = useState (null);
  const [ipAddress, setIpAddress] = useState(""); // Define ipAddress state
  const [idKey, setIdKey] = useState(""); // Define idKey state

  const handleLoginClick = async () => {
    const SCENE_API_URL = `https://${ipAddress}/api/${idKey}/scenes`;
    const GROUP_API_URL = `https://${ipAddress}/api/${idKey}/groups`;

    try {
      //fetch scenes
      const sceneResponse = await fetch(SCENE_API_URL);
      const sceneData = await sceneResponse.json();
      const scenesById = {} //create an empty object to store scenes by id

      //fetch groups
      const groupResponse = await fetch(GROUP_API_URL);
      const groupData = await groupResponse.json();
      setGroupData(groupData)
      console.log(groupData[0])

      //loop thru scenes and store them in scenesById variable
      for (const sceneId in sceneData) {
        if (sceneData.hasOwnProperty(sceneId)) {
          scenesById[sceneId] = sceneData[sceneId];
        }
      }

      setScenesData(scenesById);
      // setScenesData(data);
      setIsLoggedIn(true);
      console.log(scenesById);  

      console.log(scenesById['5IWuvEbKHTPDKZb']) // target testing

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
