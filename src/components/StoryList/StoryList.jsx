import React, { useEffect } from "react";
import AddStoryButton from "./AddStoryButton";
import StoryBubble from "./StoryBubble";
import { useIndexedDBStories } from "../../hooks/useIndexedDBStories";

function StoryList() {
  const { stories, addStory, removeExpiredStories } = useIndexedDBStories();

  useEffect(() => {
    removeExpiredStories();
  }, []);

  const timeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / (1000 * 60));
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} minutes ago`;
    const hrs = Math.floor(mins / 60);
    return `${hrs} hours ago`;
  };

  return (
    <div className="flex flex-row overflow-x-auto gap-2 py-3">
      <AddStoryButton onAddStory={addStory} />
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center">
          <StoryBubble image={story.imageUrl} />
          <p className="text-xs text-gray-500">{timeAgo(story.createdAt)}</p>
        </div>
      ))}
    </div>
  );
}

export default StoryList;
