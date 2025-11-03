import React, { Component, useRef } from "react";

function StoryBubble({ image }) {
  return (
    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
      <img
        src={image}
        alt="story"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
}

export default StoryBubble;