import { useState, useRef } from 'react'
import './App.css'
import StoryList from './components/StoryList/StoryList'
function App({ onAddStory }) {
    const [stories, setStories] = useState([]);
    const handleAddStory = (newStory) => {
        setStories([...stories, newStory]);
    };
    return (
        <div className="max-w-5xl mx-auto px-5 mt-2">
            <h1>Story Feature</h1>
            <StoryList stories={stories} onAddStory={handleAddStory} />
        </div>
    );
}
export default App
