import { fabric } from "fabric";
import store from '../context/store'; 
import { addItem } from '../context/contentReducer'; 


export default class BasicFunctionsClass {
 
  constructor(fabCanvas) {
    console.log("constructed");
    this.fabCanvas = fabCanvas;
    this.id = 0;
    this.selectedId=0;
  }

  setActive(id){
    let target=null;
    this.fabCanvas.forEachObject(obj => {
      if (obj.id === id) {
        this.fabCanvas.setActiveObject(obj);
        target=obj;
      }
    });
    this.fabCanvas.renderAll();

    return target;
    
  }


  getSelectedId(){
    return this.selectedId;
  }

  deleteElementsByGroupID(groupId) {
    this.fabCanvas.forEachObject(obj => {
      if (obj.id && obj.id === groupId) {
        this.fabCanvas.remove(obj);
      }
    });
    this.fabCanvas.renderAll();
  }

  addImageRect(defX=150,defY=100,defWidth=400,defHeight=200) {
    const rect = new fabric.Rect({
      name: "rectangle",
      width: 300,
      height: 100,
      strokeWidth: 3,
      fill: "rgba(0,0,0,0)",
      stroke: "black",
      originX: "center",
      originY: "center",
    });

    const line1 = new fabric.Line([-150, -50, 150, 50], {
      name: "line",
      fill: "black",
      stroke: "black",
      strokeWidth: 3,
    });

    const line2 = new fabric.Line([150, -50, -150, 50], {
      name: "line",
      fill: "black",
      stroke: "black",
      strokeWidth: 3,
    });

    const group = new fabric.Group([rect, line1, line2], {
      stroke:"blue",
      name: "imageRect",
      id: ++this.id,
      left: defX,
      top: defY,
      scaleX:defWidth/300,
      scaleY:defHeight/100
    });

    group.on("selected", () => {
      this.selectedId=group.id;
      console.log(this.selectedId);
    });

    this.fabCanvas.add(group);

    console.log("rectangle image added");
  }

  addImageCircle(defX=150,defY=100,defRadius=100) {
    const circle = new fabric.Circle({
      name: "circle",
      strokeWidth: 3,
      fill: "rgba(0,0,0,0)",
      stroke: "black",
      radius: 100
    });

    const line1 = new fabric.Line([100 - (100 / Math.sqrt(2)), 100 - (100 / Math.sqrt(2)), 100 + (100 / Math.sqrt(2)), 100 + (100 / Math.sqrt(2))], {
      name: "line",
      fill: "black",
      stroke: "black",
      strokeWidth: 3,
    });

    const line2 = new fabric.Line([100 - (100 / Math.sqrt(2)), 100 + (100 / Math.sqrt(2)), 100 + (100 / Math.sqrt(2)), 100 - (100 / Math.sqrt(2))], {
      name: "line",
      fill: "black",
      stroke: "black",
      strokeWidth: 3,
    });

    const group = new fabric.Group([circle, line1, line2], {
      name: "imageCircle",
      id: ++this.id,
      left: defX,
      top: defY,
      scaleX:defRadius/100,
      scaleY:defRadius/100
    });
    group.on("selected", () => {
      this.selectedId=group.id;
      console.log(this.selectedId);
    });

    this.fabCanvas.add(group);
    console.log("circle image added");
  }

  addText(defX=150,defY=100) {
    const text = new fabric.IText("lorem ipsum", {
      top:defY,
      left:defX,
      id: ++this.id,
      name: "text",
      fill: "black",
    });

    text.on("selected", () => {
      this.selectedId=text.id;
      console.log(this.selectedId);
    });

    this.fabCanvas.add(text);
    console.log("text added");
  }

  addLine(defX=50,defY=50,defWidth=100) {
    const line = new fabric.Line([defX, defY, defX+defWidth, defY], {
      id: ++this.id,
      name: "line",
      fill: "black",
      stroke: "black",
      strokeWidth: 3,
    });

    line.on("selected", () => {
      this.selectedId=line.id;
      console.log(this.selectedId);
    });

    this.fabCanvas.add(line);
    console.log("line added");
  }

  addInput(defX=150,defY=100,defWidth=150,defHeight=50) {
    const rect = new fabric.Rect({
      top:defY,
      left:defX,
      id: ++this.id,
      name: "input",
      width: defWidth,
      height: defHeight,
      strokeWidth: 3,
      fill: "rgba(0,0,0,0)",
      stroke: "black",
    });

    rect.on("selected", () => {
      this.selectedId=rect.id;
      console.log(this.selectedId);
    });

    this.fabCanvas.add(rect);
    console.log("input added");
  }

  addLogo(defX=150,defY=100,defWidth=100,defHeight=100) {
    const rect = new fabric.Rect({
      name: "rectangle",
      width: 100,
      height: 100,
      strokeWidth: 3,
      fill: "rgba(0,0,0,0)",
      stroke: "black",
    });

    const triangle = new fabric.Triangle({
      name: "triangle",
      top: 25,
      left: 75,
      width: 50,
      height: 50,
      strokeWidth: 3,
      fill: "rgba(0,0,0,0)",
      stroke: "black",
      angle: 90
    });

    const group = new fabric.Group([rect, triangle], {
      id: ++this.id,
      name: "logo",
      left: defX,
      top: defY,
      scaleX:defWidth/100,
      scaleY:defHeight/100
    });

    group.on("selected", () => {
      this.selectedId=group.id;
      console.log(this.selectedId);
    });

    this.fabCanvas.add(group);
    console.log("logo added");
  }

  addButton(defX=150,defY=100,defWidth=150,defHeight=50) {
    const rect = new fabric.Rect({
      name: "rectangle",
      width: 150,
      height: 50,
      strokeWidth: 3,
      fill: "rgba(0,0,0,0)",
      stroke: "black",
    });

    const text = new fabric.IText("button", {
      name: "text",
      left: 10,
      fill: "black",
    });

    const group = new fabric.Group([rect, text], {
      id: ++this.id,
      left: defX,
      top: defY,
      scaleX:defWidth/150,
      scaleY:defHeight/50
    });

    group.on("selected", () => {
      this.selectedId=group.id;
      console.log(this.selectedId);
    });

    this.fabCanvas.add(group);
    console.log("button added");
  }

  saveJson() {
    var result = {};
    this.fabCanvas.forEachObject(obj => {
        result[obj.name] = {
            "id": obj.id,
            "height": obj.height,
            "width": obj.width,
            "top": obj.top,
            "left": obj.left,
            "url": obj.url ? obj.url : 0  
        };
    });
    console.log(result);
  }

  readThis(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const jsonData = JSON.parse(event.target.result);
        for (let i = 0; i < jsonData.length; i++) {
          const element = jsonData[i];
          if(element["type"]==="image"){ 
            this.addImageRect(element["x"],element["y"],element["width"],element["height"]);
            this.handleAddItem("image rectangle",this.id++);
          }

          else if(element["type"]==="input") {
            this.addInput(element["x"],element["y"],element["width"],element["height"]);
            this.handleAddItem("input",this.id++);

          }

          else if(element["type"]==="text") {
            this.addText(element["x"]);
            this.handleAddItem("text",this.id++);

          }

          else if(element["type"]==="button") {
            this.addButton(element["x"],element["y"],element["width"],element["height"]);
            this.handleAddItem("button",this.id++);

          }

          else if(element["type"]==="logo") {
            this.addLogo(element["x"],element["y"],element["width"],element["height"]);
            this.handleAddItem("logo",this.id++);

          }
          
        }
    };
    reader.readAsText(file);




  }


  handleAddItem = (itemName,idNumber ) => {
    store.dispatch(addItem({id:idNumber,name: itemName}));
  };

}
