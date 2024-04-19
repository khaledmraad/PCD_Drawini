import { useState } from 'react';
import Main from './component/Main';
import {fabricCanvasContext,selectedElementContext} from './context/context';
import store  from './context/store';
import { Provider } from 'react-redux'


function UserCanvas() {

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

export default UserCanvas;
