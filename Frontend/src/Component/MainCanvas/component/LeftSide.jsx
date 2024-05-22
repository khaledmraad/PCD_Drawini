import React from "react";
import { useSelector } from 'react-redux';

export default function LeftSide({ content, setSelectedElement, selectedElement, basicFunctions, greenLight }) {
  // Ensure content is always an array
  const contentList=useSelector(state=>state.content);

  return (
    <div className="shrink-0 mx-auto max-w-full bg-zinc-300 h-[868px] w-full" id="content">
      {contentList.content.map((x) => {
        return (
          <div key={x.id} onClick={() => setSelectedElement(basicFunctions.setActive(x.id))} style={selectedElement.id === x.id ? greenLight : null}>
            {x.name}
          </div>
        );
      })}
    </div>
  );
};
