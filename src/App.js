
//sample scene = cSt4xDglSTLR9lp (homework)
//green bug = g3Y6E1wtnkUZJV8

import React from "react";
import { useState, useEffect } from 'react';

import './App.scss' // imports stylesheet;
import Rooms from './Rooms';
import WelcomeScreen from './WelcomeScreen';
import Room from './Room';
import CurrentRoom from './CurrentRoom';

let ipAddress = ''
let idKey = ''

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roomSelected, setRoomSelected] = useState(false);
  const [scenesData, setScenesData] = useState([]); // Initialize as an empty array  const [groupData, setGroupData] = useState (null);
  const [groupData, setGroupData] = useState(null);
  const [ipAddress, setIpAddress] = useState(""); // Define ipAddress state
  const [idKey, setIdKey] = useState(""); // Define idKey state
  const [defaultBrightness, setDefaultBrightness] = useState(0);
  const [scenesArray, setScenesArray] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // search bar text onChange



  //login authentication, talks to bridge and fetches data on scenes
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
      
      // Create an array of scene objects
    const scenesArray = Object.keys(scenesById).map((sceneId) => {
      return {
        id: sceneId,
        name: scenesById[sceneId].name,
      };
    });

    setScenesData(scenesArray);
    setIsLoggedIn(true);
    console.log(scenesArray);

    console.log(scenesArray); // log entire array
  } catch (error) {
    console.error('Error fetching scenes data:', error);
  }

    const LIGHTS_API_URL = `https://${ipAddress}/api/${idKey}/lights`;
    const lightsResponse = await fetch(LIGHTS_API_URL);
    const lightsData = await lightsResponse.json();

    // Calculate the average brightness of the on lights
    let totalBrightness = 0;
    let onLightsCount = 0;

    for (const lightId in lightsData) {
      if (lightsData.hasOwnProperty(lightId)) {
        const light = lightsData[lightId];
        if (light.state.on) {
          totalBrightness += light.state.bri;
          onLightsCount++;
        }
      }
    }

    // Calculate the average brightness
    const averageBrightness =
      onLightsCount > 0 ? Math.round(totalBrightness / onLightsCount) : 0;

    // Set the default brightness in the state
    setDefaultBrightness(averageBrightness);
  };

  //controls on and off buttons of function, by fetching api light values and sending PUT method
  const toggleLightsPower = () => {
    const LIGHTS_API_URL = `https://${ipAddress}/api/${idKey}/lights`;
  
    fetch(LIGHTS_API_URL)
      .then(response => response.json())
      .then(lights => {
        // Iterate over each light and send the on/off command
        for (const lightId in lights) {
          if (lights.hasOwnProperty(lightId)) {
            // Replace 'on' with 'off' and vice versa to toggle power
            const newPowerState = lights[lightId].state.on ? false : true;
  
            // Send a PUT request to update the light's state
            fetch(`${LIGHTS_API_URL}/${lightId}/state`, {
              method: 'PUT',
              body: JSON.stringify({ on: newPowerState }),
            })
              .then(response => response.json())
              .then(updatedLight => {
                console.log(`Light ${lightId} is now ${newPowerState ? 'on' : 'off'}`);
              })
              .catch(error => console.error('Error updating light state', error));
          }
        }
      })
      .catch(error => console.error('Error fetching lights', error));
  };

  // handle brightness slider on other components
  const adjustLightsBrightness = (brightness) => {
    const BRI_API_URL = `https://${ipAddress}/api/${idKey}/lights`;
  
    fetch(BRI_API_URL)
      .then((response) => response.json())
      .then((lights) => {
        // Iterate over each light in lights
        for (const lightId in lights) {
          if (lights.hasOwnProperty(lightId)) {
            const light = lights[lightId];
            const newBrightnessState = brightness; // Use the provided brightness value
  
            // Send a PUT request to update the light's state
            fetch(`${BRI_API_URL}/${lightId}/state`, {
              method: 'PUT',
              body: JSON.stringify({ bri: newBrightnessState }),
            })
              .then((response) => response.json())
              .then((updatedLight) => {
                console.log(`Light ${light.name} is now set to brightness ${newBrightnessState}`);
              })
              .catch((error) => console.error('Error updating light state', error));
          }
        }
      })
      .catch((error) => console.error('Error fetching lights', error));
  };

  const handleSelectScene = async (sceneId) => {
    try {
  
      const APPLY_SCENE_API_URL = `https://${ipAddress}/api/${idKey}/groups/1/action`; 
      // check if scenesArray is available in the component state
      if (!scenesData || scenesData.length === 0) {
        console.error('scenesArray is empty or not yet initialized');
        // handle the error 
        return;
      }
      // send a PUT request to apply the selected scene
      const response = await fetch(APPLY_SCENE_API_URL, {
        method: 'PUT',
        body: JSON.stringify({ scene: sceneId }),
      });

      if (response.ok) {
        // find the scene object with the matching ID from scenesArray
        const selectedScene = scenesData.find((scene) => scene.id === sceneId);

      if (selectedScene) {
        console.log(`Successfully applied scene: ${selectedScene.name}`);
      } else {
        console.error('Scene not found:', sceneId);
        // handle the error 
      }
    } else {
      console.error('Failed to apply scene:', response.statusText);
      // handle the error 
    }
  } catch (error) {
    console.error('Error applying scene:', error);
    // handle the error 
  }
  };

// event handler for input changes in search bar
  const handleSearchInput = (event) => {
    setSearchValue(event.target.value);
    console.log(event.target.value); // logging search value
  };

  // handles search bar scenes
  const handleSearchScene = async (event, sceneName) => {
    console.log("Search button clicked!");
    console.log("Search value:", searchValue);
    console.log("Scene name:", sceneName);
  
    if (event.key === "Enter") {
      handleSearchScene(searchValue);
    }
  
    try {
      const APPLY_SCENE_API_URL = `https://${ipAddress}/api/${idKey}/groups/1/action`;
  
      // check if scenesData is available in the component state
      if (!scenesData || scenesData.length === 0) {
        console.error("scenesArray is empty or not yet initialized");
        // handle the error
        return;
      }
  
      // make sure sceneName is a string
      const trimmedSceneName = typeof sceneName === "string" ? sceneName.trim() : "";
  
      // find the scene object with the matching name from scenesData
      const selectedScene = scenesData.find(
        (scene) => scene.name.trim().toLowerCase() === trimmedSceneName.toLowerCase()
      );
  
      if (selectedScene) {
        console.log("Found the scene!");
  
        // send a PUT request to apply the selected scene
        const response = await fetch(APPLY_SCENE_API_URL, {
          method: "PUT",
          body: JSON.stringify({ scene: selectedScene.id }),
        });
  
        if (response.ok) {
          console.log(`Successfully applied scene: ${selectedScene.name}`);
        } else {
          console.error("Failed to apply scene:", response.statusText);
          // handle the error
        }
      } else {
        console.error("Scene not found:", trimmedSceneName);
        // handle the error
      }
    } catch (error) {
      console.error("Error applying scene:", error);
      // handle the error
    }
  };

  

  // bri = brightness: 1-254
  // hue = hue of light: wrapping val between 0-65535
  // saturation: 0(white)-254(colored)
  // xy: coordinates of color in CIE color space 
  // ct: mired color temp of light, 153(6500k)-500(2000)k
  // colormode: indicates the mode which the light is working in


  const handleRoomClick = () => {
    console.log("clicked the room button!")
    setRoomSelected(true)
    console.log("room selected (after state change)")

  }

  const handleBackClick = () => {
    console.log("clicked back page button")
    setRoomSelected(false)
    console.log("room changed (after state change)")
  }

  return (
    <div className='main-page'>
      
      {isLoggedIn ? (
        roomSelected ? (
          <CurrentRoom 
            toggleLightsPower={toggleLightsPower}
            adjustLightsBrightness={adjustLightsBrightness}
            handleBackClick={handleBackClick}
            scenesData={scenesData}
            handleSelectScene={handleSelectScene}
            handleSearchInput={handleSearchInput}
            handleSearchScene={handleSearchScene}
            />
            
            
        ) : (
          <Rooms
            scenesData={scenesData}
            toggleLightsPower={toggleLightsPower}
            adjustLightsBrightness={adjustLightsBrightness}
            handleRoomClick={handleRoomClick}
          />
        )
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
