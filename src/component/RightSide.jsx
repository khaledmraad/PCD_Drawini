import React,{useContext} from "react";
import { fabricCanvasContext } from "../context/context";

export default function RightSide({ selectedElement }) {

  const { fabCanvas } = useContext(fabricCanvasContext);

    return (
        <div>
            {/* {console.log(selectedElement)} */}
            <label>width</label>
            <input
                type="number"
                defaultValue={selectedElement.width * selectedElement.scaleX}
                onChange={(e) =>{
                    selectedElement.set({
                        scaleX: parseInt(e.target.value)/selectedElement.width
                    });
                    fabCanvas.renderAll();}
                }
            />

            <br/>


            <label>HEIGHT</label>
            <input
                type="number"
                defaultValue={selectedElement.height * selectedElement.scaleY}
                onChange={(e) =>{
                    selectedElement.set({
                        scaleX: parseInt(e.target.value)/selectedElement.height
                    });
                    fabCanvas.renderAll();}
                }
            />
            <br/>


            <label>TOP</label>
            <input
                type="number"
                defaultValue={selectedElement.top}
                onChange={(e) =>{
                    selectedElement.set({
                        top: parseInt(e.target.value)
                    });
                    fabCanvas.renderAll();}
                }
            />
            <br/>
            
            <label>LEFT</label>
            <input
                type="number"
                defaultValue={selectedElement.left}
                onChange={(e) =>{
                    selectedElement.set({
                        left: parseInt(e.target.value)
                    });
                    fabCanvas.renderAll();}
                }
            />
            <br/>


        </div>
    );
}
