import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import StoriesBar from "./components/storiesBar";
import ViewStories from "./components/viewStories";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoriesBar/>}/>
        <Route path="/view/:storyId" element={<ViewStories/>}/>
      </Routes>
    </Router>
    
   
  );
}

export default App;