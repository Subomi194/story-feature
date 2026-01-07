import {useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import ResizeImage from "../resizeImage";
import { HiPlusSm } from "react-icons/hi";
import { useNavigate } from "react-router-dom";


function StoryFeature() {
   
    const [stories, setStories] = useLocalStorage("stories", []);

    const navigate = useNavigate();

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const resizedBase64 = await ResizeImage(file);

        const newStory = {
            id: Date.now(),
            src: resizedBase64,
            createdAt:  Date.now(),
            expiredAt: Date.now() + 600000,
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
        <div className=" m-4 p-4 border-dashed border-2 border-gray-300 rounded-lg flex gap-5">
            <input type="file" id="input" onChange={handleImageChange} 
            className="hidden"/>

            <label htmlFor="input" className="cursor-pointer rounded-full 
            border-5 w-20 h-20 flex justify-center items-center">
                <HiPlusSm className="text-5xl " />
            </label>


            <div className="flex justify-center items-center gap-5" >
                {stories.map((story, ) => (
                    <img
                    onClick={() => {
                        navigate(`/view/${story.id}`

                        )
                        ;
                    }}
                    key={story.id}
                    src={story.src}
                    alt="story"
                    
                    className="w-21 h-21 rounded-full border-2 border-dashed" />
                ))}
            </div>
           
        </div>
        
    </div>
  );
}
export default StoryFeature;