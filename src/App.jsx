import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App({onAddStory}) {
 const handleFileChange = (e)=>{
         const file = e.target.files[0];
         if(!file) return;
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

export default App
