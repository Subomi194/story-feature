import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

function ViewStories() {
    const { storyId } = useParams();
    const [stories] = useLocalStorage("stories", []);

    const story = stories.find((s) => s.id === parseInt(storyId));

    if (!story) {
        return (
            {message: "Story not found"}
        );
    }
    


    
  return (
    <div className="bg-gray-800 ">
        <div>
            {story && (
                <img 
                key ={story.id}
                src={story.src}
                alt="Story"
                className="max-w-full max-h-screen mx-auto"
                />
            )}

            
            

        </div>
      
    </div>
  );
}

export default ViewStories;