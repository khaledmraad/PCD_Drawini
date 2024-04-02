import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './component/Main';
import {fabricCanvasContext,selectedElementContext} from './context/context';

function App() {

  const [fabCanvas,setFabCanvas]=useState(false);

  const [selectedElement,setSelectedElement]=useState(false);

  return (
    <selectedElementContext.Provider value={{selectedElement,setSelectedElement}}>
    <fabricCanvasContext.Provider value={{fabCanvas,setFabCanvas}}>
      <Main></Main>
    </fabricCanvasContext.Provider>
    </selectedElementContext.Provider>
  );
}

export default App;
