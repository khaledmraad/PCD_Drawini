import React from "react";


export default function CanvasAddButton({ func, content, basicFunctions }) {
    return (
      <button
        className="shrink-0 bg-red-500 rounded-full h-[59px] w-[59px] flex items-center justify-center"
        onClick={() => {
            func();
        }}
      >
        {content}
      </button>
    );
  }