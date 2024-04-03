import { fabric } from "fabric";



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

  addImageRect() {
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
      left: 150,
      top: 100,
    });

    group.on("selected", () => {
      this.selectedId=group.id;
      console.log(this.selectedId);
    });

    this.fabCanvas.add(group);

    console.log("rectangle image added");
  }

  addImageCircle() {
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
      left: 150,
      top: 100,
    });
    group.on("selected", () => {
      this.selectedId=group.id;
      console.log(this.selectedId);
    });

    this.fabCanvas.add(group);
    console.log("circle image added");
  }

  addText() {
    const text = new fabric.IText("lorem ipsum", {
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

  addLine() {
    const line = new fabric.Line([50, 50, 150, 50], {
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

  addInput() {
    const rect = new fabric.Rect({
      id: ++this.id,
      name: "input",
      width: 150,
      height: 50,
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

  addLogo() {
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
      left: 150,
      top: 100,
    });

    group.on("selected", () => {
      this.selectedId=group.id;
      console.log(this.selectedId);
    });

    this.fabCanvas.add(group);
    console.log("logo added");
  }

  addButton() {
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
      left: 150,
      top: 100,
    });

    group.on("selected", () => {
      this.selectedId=group.id;
      console.log(this.selectedId);
    });

    this.fabCanvas.add(group);
    console.log("button added");
  }

  saveJson() {
    console.log(JSON.stringify(this.fabCanvas));
  }

}
