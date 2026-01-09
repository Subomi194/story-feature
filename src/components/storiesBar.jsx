import {useEffect} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import ResizeImage from "../resizeImage";
import { HiPlusSm } from "react-icons/hi";
import { useNavigate } from "react-router-dom";


function StoriesBar() {
   
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
            expiredAt: Date.now() + 86400000, 
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
    <div className="bg-[#F7F3EF] min-h-screen flex items-center justify-center">
        <div className="bg-white/70 px-6 py-5 rounded-2xl w-full max-w-2xl shadow-sm backdrop-blur-md ">
            <div className=" p-4 flex items-center gap-6">
                <label htmlFor="story-upload" className="cursor-pointer rounded-full ring-[#5c419d] ring-5 w-20 h-20 flex justify-center items-center bg-linear-to-br from-[#C7B9E2] to-purple-[#E6D9F2] hover:scale-105 transition-transform shadow-sm">
                    <HiPlusSm className="text-3xl text-white " />
                </label>
                <input type="file" id="story-upload" onChange={handleImageChange} className="hidden"/>
                

                {stories.length > 0 ? (
                    <div className="flex gap-4 " >
                        {stories.map((story, ) => (
                            <img
                            onClick={() => {
                                navigate(`/view/${story.id}`);
                            }}
                            key={story.id}
                            src={story.src}
                            alt="story"
                            
                            className="w-21 h-21 rounded-full object-cover ring-2 ring-[#D6CBEA] hover:scale-105 transition-transform shadow-sm cursor-pointer" />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-[#5c419d] font-medium">No stories yet</p>
                )}
                
            </div>
        </div>
    </div>
  );
}
export default StoriesBar;