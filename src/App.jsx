import { useState, useRef } from 'react'
import './App.css'
import StoryBubble from './components/StoryList/StoryBubble'
import AddStoryButton from './components/StoryList/AddStoryButton'
import StoryViewer from './components/StoryViewer/StoryViewer'
function App({ onAddStory }) {
    const [stories, setStories] = useState([]);
    const handleAddStory = (newStory) => {
        setStories([...stories, newStory]);
    };
    return (
        <div className="max-w-5xl mx-auto px-5 mt-2">
            <h1>Story Feature</h1>
            <div className="scrolling overflow-y-hidden flex flex-row overflow-auto w-full h-28 whitespace-nowrap gap-1 py-2">
                <AddStoryButton onAddStory={handleAddStory} />
                {stories.map((story, index) => (
                    <StoryBubble key={index} image={story} />
                ))}
            </div>
            
        </div>
    );
}
export default App
