import React,{useContext} from "react";
import { fabricCanvasContext,selectedElementContext } from "../context/context";
import { fabric } from "fabric";

export default function RightSide({ selectedElement }) {

  const { fabCanvas } = useContext(fabricCanvasContext);
  const { setSelectedElement } = useContext(selectedElementContext);

    function addRectImageFromUrl(e){
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function() {
                var img = new fabric.Image(imgObj,{
                    left: selectedElement.left,
                    top: selectedElement.top,
                    scaleX:selectedElement.width * selectedElement.scaleX/imgObj.width,
                    scaleY:selectedElement.height * selectedElement.scaleY/imgObj.height,
                    name:selectedElement.name,
                    id:selectedElement.id,
                    url:file.name

                });

                fabCanvas.add(img);

                fabCanvas.remove(selectedElement);

                setSelectedElement(img);
                
                fabCanvas.setActiveObject(img);

                fabCanvas.renderAll();

        };




    };
    reader.readAsDataURL(file);
    }


    function addCircleImageFromUrl(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function() {
                var circle = new fabric.Circle({
                    radius: selectedElement.width * selectedElement.scaleX / 2,
                    fill: 'black',
                    absolutePositioned :true,
                    left: selectedElement.left,
                    top: selectedElement.top,
                    scaleY:1,
                    scaleX:1,
                    selectable:false
                });
    
                var fabricImg = new fabric.Image(imgObj, {

                    left: selectedElement.left,
                    top: selectedElement.top,
                    clipPath: circle,
                    scaleX: selectedElement.width * selectedElement.scaleX / imgObj.width,
                    scaleY: selectedElement.height * selectedElement.scaleY / imgObj.height,
                    name:selectedElement.name,
                    id:selectedElement.id,
                    url:file.name
                
                });
                const intialXScale=fabricImg.scaleX;
                const intialYScale=fabricImg.scaleY;

                fabricImg.on('moving',() => {circle.set({"left":fabricImg.left,"top":fabricImg.top});console.log(fabricImg.url)} );
                
                fabricImg.on('scaling',() => {circle.set({"left":fabricImg.left,"top":fabricImg.top,"scaleX":fabricImg.scaleX/intialXScale,"scaleY":fabricImg.scaleY/intialYScale})} );
                
                fabricImg.on('rotating',() => {circle.set({"left":fabricImg.left,"top":fabricImg.top,"angle":fabricImg.angle})} );
    
                
                fabCanvas.add(fabricImg);

                fabCanvas.remove(selectedElement);

                setSelectedElement(fabricImg);
                
                fabCanvas.setActiveObject(fabricImg);

                fabCanvas.renderAll();
            };
        };
        reader.readAsDataURL(file);
    }


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
                        scaleY: parseInt(e.target.value)/selectedElement.height
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


            {["imageRect", "imageCircle"].includes(selectedElement.name) ? 
            
                    selectedElement.name==="imageRect" ?
                        <input type="file" onChange={(e)=>addRectImageFromUrl(e)}  ></input>:
                        <input type="file" onChange={(e)=>addCircleImageFromUrl(e)} ></input>
                

                : ""}

            {selectedElement.url ? selectedElement.url : "shit dont exist"}



        </div>
    );
}
