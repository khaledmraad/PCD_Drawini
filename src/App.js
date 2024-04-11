import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './component/Main';
import {fabricCanvasContext,selectedElementContext} from './context/context';
import store  from './context/store';
import { Provider } from 'react-redux'


function App() {

  const [fabCanvas,setFabCanvas]=useState(false);

  const [selectedElement,setSelectedElement]=useState(false);

  return (
    <selectedElementContext.Provider value={{selectedElement,setSelectedElement}}>
    <fabricCanvasContext.Provider value={{fabCanvas,setFabCanvas}}>
      <Provider store={store}>
      <Main></Main>
      </Provider>
    </fabricCanvasContext.Provider>
    </selectedElementContext.Provider>
  );
}

export default App;
