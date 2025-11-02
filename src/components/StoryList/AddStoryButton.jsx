import React, { Component, useRef } from "react";

function AddStoryButton({onAddStory}){
   const handleFileChange = (e)=>{
        const file = e.target.files[0]; // Chọn file từ người dùng 
        if(!file) return; 
        //Đọc và chuyển file thành chuỗi Base64
        const reader = new FileReader(); 
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            onAddStory(reader.result);
        }
   }
   const fileInput = useRef(null);
   const handleClick = ()=>{
       fileInput.current.click();
   }
   return (
       <>
           <button onClick={handleClick}>+</button>
           <input type="file" accept="image/*" onChange={handleFileChange} hidden ref={fileInput} />
       </>
   );
}
export default AddStoryButton;