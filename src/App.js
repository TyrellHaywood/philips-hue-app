
import React from "react";
import { useState, useEffect } from 'react';

import './App.scss' // imports stylesheet;
import Rooms from './Rooms';
import WelcomeScreen from './WelcomeScreen';
import Room from './Room';
import CurrentRoom from './CurrentRoom';
import EditMenu from './EditMenu';

let ipAddress = ''
let idKey = ''

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roomSelected, setRoomSelected] = useState(false);
  const [editMenu, SetEditMenu] = useState(false);
  const [scenesData, setScenesData] = useState([]); // initialize as an empty array 
  const [groupData, setGroupData] = useState(null);
  const [lightsData, setLightsData] = useState([]); // initialize as an empty array 
  const [ipAddress, setIpAddress] = useState(""); // define ipAddress state
  const [idKey, setIdKey] = useState(""); // define idKey state
  const [defaultBrightness, setDefaultBrightness] = useState(0);
  const [scenesArray, setScenesArray] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // search bar text onChange
  const [selectedScene, setSelectedScene] = useState(null);
  const [sceneNameEdit, setSceneNameEdit] = useState("");
  const [readOnlyChange, setReadOnlyChange] = useState(true);
  const [autoFocusChange, setAutoFocusChange] = useState(false);
  const [ownerName, setOwnerName] = useState("");



  //login authentication, talks to bridge and fetches data on scenes
  const handleLoginClick = async () => {
    const SCENE_API_URL = `https://${ipAddress}/api/${idKey}/scenes`;
    const GROUP_API_URL = `https://${ipAddress}/api/${idKey}/groups`;
    const LIGHT_API_URL = `https://${ipAddress}/api/${idKey}/lights`;

    try {
      //fetch scenes
      const sceneResponse = await fetch(SCENE_API_URL);
      const sceneData = await sceneResponse.json();
      const scenesById = {} // create an empty object to store scenes by id

      // create an array of group objects

        // fetch groups
        const groupResponse = await fetch(GROUP_API_URL);
        const groupData = await groupResponse.json();
        const groupsById = {} // create an empty object to store lights by id
        setLightsData(groupData);
        console.log(groupData);

        // loop thru groups and store them in groupDataById variable
        for(const lightId in groupData) {
          if (groupData.hasOwnProperty(lightId)) {
            groupsById[lightId] = groupData[lightId];
          }
        }

        setGroupData(groupData);
        console.log("this is group data updated: " + groupData); // log entire array

      //loop thru scenes and store them in scenesById variable
      for (const sceneId in sceneData) {
        if (sceneData.hasOwnProperty(sceneId)) {
          scenesById[sceneId] = sceneData[sceneId];
        }
      }
      // Create an array of scene objects
    const scenesArray = Object.keys(scenesById).map((sceneId) => {
      const {name, state} = scenesById[sceneId]; // destructure name and state
      return {
        id: sceneId,
        name
      };
    });
    setScenesData(scenesArray);
    setIsLoggedIn(true);
    console.log(scenesArray); // log entire array
  } catch (error) {
    console.error('Error fetching scenes data:', error);
  }


  // create an array of light objects
    try {
      // fetch lights
      const lightResponse = await fetch(LIGHT_API_URL);
      const lightData = await lightResponse.json();
      const lightsById = {} // create an empty object to store lights by id
      setLightsData(lightData);
      console.log(lightData);

      // loop thru lights and store them in lightsById variable
      for(const lightId in lightData) {
        if (lightData.hasOwnProperty(lightId)) {
          lightsById[lightId] = lightData[lightId];
        }
      }
      
      // Create an array of scene objects
      const lightsArray = Object.keys(lightsById).map((lightId) => {
        const {name, state} = lightsById[lightId]; // destructure name and state
        return {
          id: lightId,
          name,
          on: state.on,
          ct: state.ct, // ct value
          xy: state.xy, // xy coordinate in [x, y]
          bri: state.bri // brightness, 0-500
        };
      });
      setLightsData(lightsArray);
      console.log(lightsArray); // log entire array

      // //-.---O--------*OoO* XY TO RGB COLOR CONVERSIONS *--Oo-0-------.--
      
      // loop through all lights in the lightsArray
      try {
        lightsArray.forEach(light => {
        // get xy coordinates & brightness from lights object
        const xValue = light.xy[0];
        const yValue = light.xy[1];
        const briValue = light.bri / 255.0;
        const z = 1.0 - xValue - yValue;
        const X = (briValue / yValue) * xValue;
        const Z = (briValue / yValue) * z;
        // convert XYZ to RGB
        let r = X * 1.612 - briValue * 0.203 - Z * 0.302;
        let g = -X * 0.509 + briValue * 1.412 + Z * 0.066;
        let b = X * 0.026 - briValue * 0.072 + Z * 0.962;
        // apply gamma correction
        r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
        g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
        b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
        // normalize RGB values
        const maxValue = Math.max(r,g,b);
        r /= maxValue;
        g /= maxValue;
        b /= maxValue;
        // scale to 0-255 range
        r = r * 255;   if (r < 0) { r = 255 }
        g = g * 255;   if (g < 0) { g = 255 }
        b = b * 255;   if (b < 0) { b = 255 }

        const rgbInt = {r:Math.round(r), g:Math.round(g), b:Math.round(b)};
        console.log(rgbInt)
        // convert RGB to hex
        const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
        const rHex = clamp(rgbInt.r).toString(16).padStart(2, '0');
        const gHex = clamp(rgbInt.g).toString(16).padStart(2, '0');
        const bHex = clamp(rgbInt.b).toString(16).padStart(2, '0');
        const hexValue = `#${rHex}${gHex}${bHex}`;
        console.log(hexValue)
        // add hexValue as property for each light
        light.hexValue = hexValue
        })
      }catch (error) {
        console.error("Error converting xy to RGB:", error)
      }
      

      }catch (error) {
            console.error("Error mapping lights array:", error);
          }

    const LIGHTS_API_URL = `https://${ipAddress}/api/${idKey}/lights`;
    const lightsResponse = await fetch(LIGHTS_API_URL);
    const fetchedLightsData = await lightsResponse.json();

    // Calculate the average brightness of the on lights
    let totalBrightness = 0;
    let onLightsCount = 0;

    for (const lightId in fetchedLightsData) {
      if (fetchedLightsData.hasOwnProperty(lightId)) {
        const light = fetchedLightsData[lightId];
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

  // controls on/off power button for each individual light rendered in CurrentRoom.tsx
  const toggleSingleLightPower = async (lightId) => {
    try {
      const SINGLE_LIGHT_API_URL = `https://${ipAddress}/api/${idKey}/lights/${lightId}`;
  
      if (!lightsData || lightsData.length === 0) {
        console.error('lightsArray is empty or not yet initialized');
        return;
      }
  
      const selectedLight = lightsData.find((light) => light.id === lightId);
      
      if (!selectedLight) {
        console.error('Light not found:', lightId);
        return;
      }
  
      const newPowerState = selectedLight.state && selectedLight.state.on ? false : true;
        
      const response = await fetch(SINGLE_LIGHT_API_URL, {
        method: 'PUT',
        body: JSON.stringify({ on: newPowerState }),
      });
  
      if (response.ok) {
        console.log(`Successfully applied light: ${selectedLight.name}, state of on is ${selectedLight.on}`);
      } else {
        console.error('Failed to apply light:', response.statusText);
      }
    } catch (error) {
      console.error('Error applying scene:', error);
      console.log(lightsData)
    }
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
        setSelectedScene(selectedScene);
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
          setSelectedScene(selectedScene);
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

  const handleEditClose = () => {
    console.log("clicked back page button")
    SetEditMenu(false)
    console.log("room changed (after state change)")
  }

  const handleEditScene = () => {
    console.log("Clicked Edit Scene Button")
    SetEditMenu(true)
  }


  // event handler for input changes when editing scene name
  const handleNameEditInput = (event) => {
    setSceneNameEdit(event.target.value);
    console.log(event.target.value); // logging search value
  };

  // handles unlocking scene name input box for editing
  const handleEditName = () => {
    console.log("Clicked Edit Scene Name Button")
    setReadOnlyChange(false)
    setAutoFocusChange(true)
  }

  const saveSceneEdit = () => {
    console.log("clicked save button")
    // reset readOnly and autoFocus attributes
    setReadOnlyChange(true)
    setAutoFocusChange(false)

    // send put request to api and set new name

    // close edit menu
    SetEditMenu(false)

  }

  return (
    <div className='main-page'>
      
      {isLoggedIn ? (
        roomSelected ? (
          editMenu ? (
          <EditMenu
            scenesData={scenesData}
            lightsData={lightsData}
            toggleSingleLightPower={toggleSingleLightPower}
            adjustLightsBrightness={adjustLightsBrightness}
            selectedScene={selectedScene}
            handleEditClose={handleEditClose}
            editMenu={editMenu}
            handleNameEditInput={handleNameEditInput}
            readOnlyChange={readOnlyChange}
            autoFocusChange={autoFocusChange}
            handleEditName={handleEditName}
            saveSceneEdit={saveSceneEdit}
          />
          ): (
          <CurrentRoom 
            toggleLightsPower={toggleLightsPower}
            toggleSingleLightPower={toggleSingleLightPower}
            adjustLightsBrightness={adjustLightsBrightness}
            handleBackClick={handleBackClick}
            scenesData={scenesData}
            lightsData={lightsData}
            handleSelectScene={handleSelectScene}
            handleSearchInput={handleSearchInput}
            handleSearchScene={handleSearchScene}
            selectedScene={selectedScene}
            handleEditScene={handleEditScene}
            />
            )
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
