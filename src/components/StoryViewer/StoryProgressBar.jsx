import React, { Component, useEffect, useRef, useState } from "react";

function StoryProgressBar({ duration = 3000, onFinish }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(0);
        const intervalTime = duration / 100;
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [duration]);

    useEffect(() => {
        if (progress >= 100) {
            onFinish && onFinish();
        }
    }, [progress, onFinish]);
    return (
        <>
            <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                <div className="bg-white h-1 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
        </>
    )
}
export default StoryProgressBar;