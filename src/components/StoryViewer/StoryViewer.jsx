import React, { useEffect, useState } from "react";
import StoryProgressBar from "./StoryProgressBar";

function StoryViewer({ stories = [], duration = 3000, onAllStoriesEnd }) {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    const handleStoryFinish = () => {
        if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex((prev) => prev + 1);
        } else {
            onAllStoriesEnd && onAllStoriesEnd();
        }
    };

    useEffect(() => {
        setCurrentStoryIndex(0);
    }, [stories]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onAllStoriesEnd && onAllStoriesEnd();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onAllStoriesEnd]);

    if (stories.length === 0) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={onAllStoriesEnd}
        >
            <div
                className="relative w-[400px] h-[700px] rounded-xl overflow-hidden shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={onAllStoriesEnd}
                    className="absolute top-3 right-3 text-white text-2xl hover:text-gray-400 transition"
                >
                    ✕
                </button>

                {currentStoryIndex > 0 && (
                    <button
                        onClick={() => setCurrentStoryIndex((prev) => prev - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-3xl hover:scale-110 transition"
                    >
                        ❮
                    </button>
                )}

                {currentStoryIndex < stories.length - 1 && (
                    <button
                        onClick={() => setCurrentStoryIndex((prev) => prev + 1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-3xl hover:scale-110 transition"
                    >
                        ❯
                    </button>
                )}

                <div className="absolute top-2 left-0 w-full px-3">
                    <StoryProgressBar
                        key={currentStoryIndex}
                        duration={duration}
                        onFinish={handleStoryFinish}
                    />
                </div>

                <div className="w-full h-full bg-black flex items-center justify-center">
                    <img
                        src={stories[currentStoryIndex]}
                        alt={`Story ${currentStoryIndex + 1}`}
                        className="max-w-full max-h-full object-contain transition-opacity duration-500"
                    />
                </div>
            </div>
        </div>
    );
}

export default StoryViewer;
