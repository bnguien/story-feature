import React, { Component, useRef } from "react";

function AddStoryButton({ onAddStory }) {
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Chọn file từ người dùng 
        if (!file) return;
        //Đọc và chuyển file thành chuỗi Base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            onAddStory(reader.result);
        }
    }
    const fileInput = useRef(null);
    const handleClick = () => {
        fileInput.current.click();
    }
    return (
        <>
            <div
                onClick={handleClick}
                className="group w-16 mr-2 flex shrink-0 items-center relative border-dashed 
                justify-center cursor-pointer h-16 p-1 rounded-full border-2 border-gray-400 text-gray-400 
                hover:border-blue-400 hover:text-blue-400 transition-colors"
            >
                <i className="ri-add-line ri-2x group-hover:scale-105 transition-transform">+</i>
                <input
                    type="file"
                    ref={fileInput}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute top-0 left-0 w-full h-full hidden"
                />
            </div>

        </>
    );
}
export default AddStoryButton;