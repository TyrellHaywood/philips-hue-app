//philips hue bridge ip address: 192.168.0.22 (192.168.0.235 - ottawa)
//debugger ip address: https://192.168.0.235/debug/clip.html
//newest user id: s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt

//sample scene = cSt4xDglSTLR9lp (homework)
//green bug = g3Y6E1wtnkUZJV8

import React from "react";
import { useState, useEffect } from 'react';

import './App.scss' // imports stylesheet;
import Home from './Home';

const API_URL = 'https://192.168.0.235/api/s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt/scenes';

const App = () => {

  const [scenesData, setScenesData] = useState(null);

  const getScenes = async () => {
    try{
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      setScenesData(data);
      console.log(data)
    
    } catch (error) {
      console.error('Error fetching scenes data:', error)
    }
  }

  useEffect(() => {
    
  }, []);

  return (
    <div className='main-page'>
      <header className='header'>
        <h1>Hue for Desktop</h1>
      </header>

      <div className='ip-address'>
        <div className="id-key__title">
          <p>ip address</p>
        </div>
        <div className='ip-address__textarea'></div>
      </div>

      <div className='id-key'>
        <div className="id-key__title">
          <p>id key</p>
        </div>
        <div className='id-key__textarea'></div>
      </div>

      <div className='button'>
        <button
        onClick={() => {
          getScenes();
          Home();
        }}>
          GO
        </button>
      </div>
      
    </div>
  )
};


export default App;
