import React, { useEffect, useRef, useContext } from "react";
import { fabric } from "fabric";
import { fabricCanvasContext,selectedElementContext } from "../context/context";

export default function MainCanvas(props) {
  const canvasRef = useRef(null);
  const { setFabCanvas } = useContext(fabricCanvasContext);

  const { setSelectedElement } = useContext(selectedElementContext);



  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: props.width,
      height: props.height,
      backgroundColor: "white",
    });

    canvas.on('mouse:down', function(options) {
      if (options.target) {
        console.log('shit selected');
        setSelectedElement(options.target);
  
      } else {
        console.log('u missed');
        setSelectedElement({id:0});
      }
    });

    setFabCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  },[props.width,props.height,setFabCanvas,setSelectedElement]);


  


  return <canvas ref={canvasRef}/>;
}
