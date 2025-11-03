import React, { useState } from "react";
import StoryViewer from "../StoryViewer/StoryViewer";

function StoryBubble({ image,  stories = [image] }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleOpenViewer = () => setIsViewerOpen(true);
  const handleCloseViewer = () => setIsViewerOpen(false);

  return (
    <>
      <div
        onClick={handleOpenViewer}
        className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer shrink-0"
      >
        <img
          src={image}
          alt="story"
          className="w-full h-full object-cover object-center"
        />
      </div>
      {isViewerOpen && (
        <StoryViewer
          stories={stories}
          duration={3000}
          onAllStoriesEnd={handleCloseViewer}
        />
      )}
    </>
  );
}

export default StoryBubble;
