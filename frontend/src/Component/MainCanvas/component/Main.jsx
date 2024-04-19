import React, { useContext,useState,useEffect } from "react";
import MainCanvas from './MainCanvas';
import { fabricCanvasContext,selectedElementContext } from "../context/context";
import basicFunctionsClass from "../behavior/basic";
import EditIcons from "../icons/EditIcons";
import CanvasAddButton from "./CanvasAddButton";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import store from '../context/store';
import { addItem ,removeItem} from '../context/contentReducer';
import { useSelector, useDispatch } from 'react-redux';
import useToken from "../../useToken";
import {useNavigate} from "react-router-dom";



export default function Main() {

  const { fabCanvas } = useContext(fabricCanvasContext);
  // const [canvasHeight, setCanvasHeight] = useState(null);
  // const [canvasWidth, setCanvasWidth] = useState(null);
  const { selectedElement ,setSelectedElement} = useContext(selectedElementContext);
  const [basicFunctions, setBasicFunctions] = useState(null);
  // const [content, setContent] = useState([]);
  const content=useSelector(state=>state.content);
  const dispatch=useDispatch();

    const canvasSize=useSelector(state=>state.canvasSize);



  const {token,setToken}=useToken()
    const navigate=useNavigate()

  var greenLight={backgroundColor:"green"};


  const editIcons=new EditIcons();


  // useEffect(() => {
  //   if (!canvasHeight && !canvasWidth) {
  //     let height = window.prompt("Enter the height");
  //     let width = window.prompt("Enter the width");
  //     setCanvasHeight(Number(height));
  //     setCanvasWidth(Number(width));
  //   console.log("done");

  //   }
  // }, [canvasHeight, canvasWidth]);

    var height=canvasSize.height
    var width=canvasSize.width
  useEffect(() => {

      console.log(height)
    if (fabCanvas) {
      setBasicFunctions(new basicFunctionsClass(fabCanvas));

      
    }
  }, [fabCanvas]);

  // const handleAddItem = (idNumber, itemName) => {
  //   console.log(itemName, idNumber);
  //   setContent(prevValue => [
  //     ...prevValue,
  //     { name: itemName, id: idNumber }
  //   ]);
  // };

  const handleAddItem = (idNumber, itemName) => {
    dispatch(addItem({id:idNumber,name: itemName}));
  };

  // dispatch(addItem({id:132,name: "itemName"}));

    function getOut(){
        localStorage.removeItem('email')
        setToken("");
        navigate("/")
    }

    function getIn(){
        navigate("/signup")

    }

    function goHome(){
        navigate("/")
    }



  return (
    <div className="flex flex-col bg-white">
        <div className="flex gap-5 px-7 py-4 w-full bg-zinc-300 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between">

                <CanvasAddButton
                    func={() => {
                        basicFunctions.addImageRect();
                        handleAddItem(basicFunctions.id, "image rectangle");
                        console.log(content);
                    }}
                    content={editIcons.rectangleImage()}
                />

                <CanvasAddButton
                    func={() => {
                        basicFunctions.addImageCircle();
                        handleAddItem(basicFunctions.id, "image circle");
                    }}
                    content={editIcons.circleImage()}
                />


                <CanvasAddButton
                    func={() => {
                        basicFunctions.addText();
                        handleAddItem(basicFunctions.id, "text");
                    }}
                    content={editIcons.text()}
                />

                <CanvasAddButton
                    func={() => {
                        basicFunctions.addLine();
                        handleAddItem(basicFunctions.id, "line");
                    }}
                    content={editIcons.line()}
                />

                <CanvasAddButton
                    func={() => {
                        basicFunctions.addInput();
                        handleAddItem(basicFunctions.id, "input");
                    }}
                    content={editIcons.input()}
                />


                <CanvasAddButton
                    func={() => {
                        basicFunctions.addLogo();
                        handleAddItem(basicFunctions.id, "logo");
                    }}
                    content={editIcons.logo()}
                />

                <CanvasAddButton
                    func={() => {
                        basicFunctions.addButton();
                        handleAddItem(basicFunctions.id, "button");
                    }}
                    content={editIcons.button()}
                />

                <CanvasAddButton
                    func={() => {
                        var ao = fabCanvas.getActiveObjects()
                        if (ao) {
                            let listIdSelected = []
                            ao.forEach(element => {
                                listIdSelected.push(element.id);
                                fabCanvas.remove(element);
                                dispatch(removeItem(element.id));
                            });

                        }
                    }}
                    content={editIcons.delete()}
                />


            </div>
            <div className="flex-auto self-start mt-3 text-5xl text-black max-md:text-4xl"
                 onClick={() => basicFunctions.saveJson()}>
                project name{" "}


            </div>
            <input type="file" onChange={(e) => basicFunctions.readThis(e)}></input>
            {token ?
                <button onClick={getOut}>Logout</button>
                : <button onClick={getIn}>Login</button>}


            <button onClick={goHome}>Home</button>


            <div className="flex text-5xl text-black max-md:text-4xl">
                <div className="flex-auto my-auto max-md:text-4xl">username</div>
                <div className="shrink-0 bg-red-500 rounded-full h-[59px] w-[59px]"/>
            </div>
        </div>


        <div className=" w-f  ull max-md:max-w-full">
        <div className="flex">
          <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full p-0">

          <LeftSide
              setSelectedElement={setSelectedElement}
              selectedElement={selectedElement}
              basicFunctions={basicFunctions}
              greenLight={greenLight}
          />


          </div>




          <div className="flex flex-col w-[52%] max-md:ml-0 max-md:w-full p-0">
            <div className="shrink-0 mx-auto max-w-full bg-zinc-300 h-[868px] w-full" id="parentDiv">
              
              <MainCanvas height={canvasSize.canvasSize[1]} width={canvasSize.canvasSize[0]}></MainCanvas>
            </div>
          </div>
          <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full p-0">

            <div className="shrink-0 mx-auto max-w-full bg-zinc-300 h-[868px] w-full" >

              {selectedElement && selectedElement.id ? 
              <RightSide selectedElement={selectedElement} /> : 
              <div>nothing selected</div>
              }

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
