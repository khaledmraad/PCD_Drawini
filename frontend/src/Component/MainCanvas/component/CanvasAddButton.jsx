import React from "react";


export default function CanvasAddButton({ func, content, name,basicFunctions }) {
    return (
      <button
        className="px-2 m-0  h-12  bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold rounded inline-flex items-center"
        onClick={() => {
            func();
        }}
      >
        <div className="  ">{content}</div> <h1 className="mx-2 text-left">{name}</h1>

      </button>
    );
  }