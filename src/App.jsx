import { useState, useRef } from 'react'
import './App.css'
import StoryBubble from './components/StoryList/StoryBubble'
import AddStoryButton from './components/StoryList/AddStoryButton'

function App({onAddStory}) {
    const [stories, setStories] = useState([]);
    const handleAddStory = (newStory) => {
        setStories([...stories, newStory]);
    };
    return (
        <div className="app">
            <h1>Story Feature</h1>
            <div className="story-list">
                {stories.map((story, index) => (
                    <StoryBubble key={index} image={story} />
                ))}
            </div>
            <AddStoryButton onAddStory={handleAddStory} />
        </div>
    );
}   
export default App
