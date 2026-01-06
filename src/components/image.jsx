import {useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import base64Encode from "../base64";
import { HiPlusSm } from "react-icons/hi";

function Image() {

    const [stories, setStories] = useLocalStorage("stories", []);
    
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const base64 = await base64Encode(file);

        const newStory = {
            id: Date.now(),
            src: base64,
            createdAt:  Date.now(),
            expiredAt: Date.now() + 60000,
        }; 
        setStories((prev) => [...prev, newStory]);
    };
    
    useEffect(() => {
        const now = Date.now();
        const validStories = stories.filter((story) => story.expiredAt > now
        );

        if (validStories.length !== stories.length) {
            setStories(validStories);

        }
    }, [stories, setStories]);


  return (
    <div className="">
        <div className=" m-4 p-4 border-dashed border-2 border-gray-300 rounded-lg">
            <input type="file" id="input" onChange={handleImageChange} 
            className="hidden"/>

            <label htmlFor="input" className="cursor-pointer rounded-full 
            border-5 w-15 h-15 flex justify-center items-center">
                <HiPlusSm className="text-5xl " />
            </label>
           
        </div>
      
        
        <div className="flex" >
            {stories.map((story, ) => (
                <img
                key={story.id}
                src={story.src}
                alt="story"
                className="w-20 h-20" />
            ))}
        </div>
    </div>
  );
}
export default Image;