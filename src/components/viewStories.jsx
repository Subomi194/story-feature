import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import '../index.css';

function ViewStories() {
    const { storyId } = useParams();
    const navigate = useNavigate()
    
    const [stories] = useLocalStorage("stories", []);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const index = stories.findIndex((s) => s.id === parseInt(storyId));

        if (index === -1) {
            navigate("/");
            return;
        }
        setCurrentIndex(index);
    }, [storyId, stories, navigate]);

    useEffect(() => {
            if (!stories.length) return;

            const timer = setTimeout(() => {
                if (currentIndex < stories.length - 1) {
                    const nextStory = stories[currentIndex + 1];
                    setCurrentIndex(currentIndex + 1);
                    navigate(`/view/${nextStory.id}`);
                } else {
                    navigate("/");
                }
            }, 3000);

            return () => clearTimeout(timer);
        }, [currentIndex, stories, navigate]);

        const story = stories[currentIndex];

        if (!story) {
            return null;
        }

  return (
    <div className="bg-gray-800 ">
        <div className=' flex gap-1 p-2 '>
            {stories.map((s, index) => (
                <div key={s.id} 
                className='flex-1 transition-all duration-70 ease-in-out '>
                <div
                    className={`h-1 rounded bg-gray-700 
                    ${index < currentIndex ? "w-full" : 
                    index === currentIndex ? "animation-progress" : "w-0" } 
                    `}
                    ></div>
                </div>
            ))}
        </div>
        <div>
            <img 
            src={story.src}
            alt="Story"
            className="max-w-full max-h-screen mx-auto"
            />

        </div>
    </div>
  );
}
export default ViewStories;