import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import '../index.css';

function ViewStories() {
    const { storyId } = useParams();
    const navigate = useNavigate()
    
    const [stories] = useLocalStorage("stories", []);
    const [currentIndex, setCurrentIndex] = useState(0);
   // const [isPaused, setIsPaused] = useState(false);

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
    },  [currentIndex, stories, navigate]);

        const handlePrevClick = () => {
            if(currentIndex > 0) {
                const prevStory = stories[currentIndex - 1];
                setCurrentIndex(currentIndex - 1);
                navigate(`/view/${prevStory.id}`);
            }
        }

        const handleNextClick = () => {
            if(currentIndex < stories.length - 1) {
                const nextStory = stories[currentIndex + 1];
                setCurrentIndex(currentIndex + 1);
                navigate(`/view/${nextStory.id}`)
            } else {
                navigate("/")
            }
        }

        //const handlePauseClick = () => {
            //setIsPaused((prev) => !prev);
        //}

        const story = stories[currentIndex];
        if (!story) return null;

  return (
    <div className="bg-[#FFF7FB] relative w-full h-screen flex flex-col">
        <div className=' flex gap-1 p-3 '>
            {stories.map((s, index) => (
                <div key={s.id} 
                className='flex-1 h-1 bg-[#EBD6E8] rounded-full '>
                <div
                    className={`h-full rounded-full 
                    ${index < currentIndex ? "w-full bg-[#C084FC]" : 
                    index === currentIndex ? "animation-progress" : "w-0" } 
                    `}
                    ></div>
                </div>
            ))}
        </div>

        <div className='items-center justify-center flex flex-1' >
            <img 
            src={story.src}
            alt="Story"
            className="max-w-full max-h-[90vh] rounded-xl shadow-sm object-contain"
            />
        </div>

        <div className='absolute inset-0 flex '>
            <div className='w-1/3 h-full'
            onClick={handlePrevClick}>

            </div>

            {/*<div className='h-full bg-blue-200'
            onClick={handlePauseClick}>
                pause
            </div>*/}

            <div className='absolute right-0 h-full w-1/3'
            onClick={handleNextClick}>
            </div>
        </div>
    </div>
  );
}
export default ViewStories;