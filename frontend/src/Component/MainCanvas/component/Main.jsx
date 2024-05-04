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
                    name={"Image Rectangle"}
                />

                <CanvasAddButton
                    func={() => {
                        basicFunctions.addImageCircle();
                        handleAddItem(basicFunctions.id, "image circle");
                    }}
                    content={editIcons.circleImage()}
                    name={"Image Circle"}
                />


                <CanvasAddButton
                    func={() => {
                        basicFunctions.addText();
                        handleAddItem(basicFunctions.id, "text");
                    }}
                    content={editIcons.text()}
                    name={"Text"}
                />

                <CanvasAddButton
                    func={() => {
                        basicFunctions.addLine();
                        handleAddItem(basicFunctions.id, "line");
                    }}
                    content={editIcons.line()}
                    name={"Line"}
                />

                <CanvasAddButton
                    func={() => {
                        basicFunctions.addInput();
                        handleAddItem(basicFunctions.id, "input");
                    }}
                    content={editIcons.input()}
                    name={"Input"}
                />


                <CanvasAddButton
                    func={() => {
                        basicFunctions.addLogo();
                        handleAddItem(basicFunctions.id, "logo");
                    }}
                    content={editIcons.logo()}
                    name={"Logo"}
                />

                <CanvasAddButton
                    func={() => {
                        basicFunctions.addButton();
                        handleAddItem(basicFunctions.id, "button");
                    }}
                    content={editIcons.button()}
                    name={"Button"}
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
                    name={"Delete"}
                />


            </div>
            <div className="flex-auto self-start  text-5xl text-black max-md:text-4xl"
                 onClick={() => basicFunctions.saveJson()}>
                Project1{" "}

            </div>
            {/*<button*/}
            {/*    className="font-bold bg-gray-400 focus:ring-4 focus:outline-none   rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center"*/}
            {/*    onClick={goHome}>*/}
            {/*</button>*/}


            <div className="flex items-center">
                <h1 htmlFor="countries" className="font-bold text-xl mx-4">Convert To Code : </h1>
                <select id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                    <option value="US">Angular</option>
                    <option value="CA">React</option>
                    <option value="FR">HTML/CSS</option>
                </select>
            </div>

            <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                </svg>
                <span>Download</span>
            </button>


            {/*{token ?*/}
            {/*    <button type="button" onClick={getOut}*/}
            {/*            className=" bg-gray-400 focus:ring-4 focus:outline-none  font-bold rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center ">*/}
            {/*        Logout*/}
            {/*        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"*/}
            {/*             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">*/}
            {/*            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
            {/*                  d="M1 5h12m0 0L9 1m4 4L9 9"/>*/}
            {/*        </svg>*/}
            {/*    </button>*/}
            {/*    : <button type="button" onClick={getIn}*/}
            {/*              className=" bg-gray-400  focus:ring-4 focus:outline-none  font-bold rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center">*/}
            {/*        Login*/}
            {/*        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"*/}
            {/*             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">*/}
            {/*            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
            {/*                  d="M1 5h12m0 0L9 1m4 4L9 9"/>*/}
            {/*        </svg>*/}
            {/*    </button>*/}
            {/*}*/}


            <button id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName"
                    className="flex items-center  text-sm pe-1 font-bold text-[#000000] rounded-full "
                    type="button">
                <span className="sr-only text-[#000000]">Open user menu</span>
                <img className="w-8 h-8 me-2 rounded-full"
                     src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                     alt="user photo"/>
                khaled
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m1 1 4 4 4-4"/>
                </svg>
            </button>


            <div id="dropdownAvatarName"
                 className="z-10 hidden text-[#000000] divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3 text-sm text-gray-900 ">
                    <div className="font-medium ">Pro User</div>
                    <div className="truncate">name@flowbite.com</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                    <li>
                        <a href="#"
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Dashboard</a>
                    </li>
                    <li>
                        <a href="#"
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Settings</a>
                    </li>
                    <li>
                        <a href="#"
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Earnings</a>
                    </li>
                </ul>
                <div className="py-2">
                    <a href="#"
                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ">Sign
                        out</a>
                </div>
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

                    <div className="shrink-0 mx-auto max-w-full bg-zinc-300 h-[868px] w-full">

                        {selectedElement && selectedElement.id ?
                            <RightSide selectedElement={selectedElement}/> :
                            <div>nothing selected</div>
                        }

                    </div>

                </div>
            </div>
        </div>
    </div>
  );
}
