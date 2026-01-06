import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import StoryFeature from "./components/storyFeature";
import ViewStories from "./components/viewStories";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoryFeature/>}/>
        <Route path="/view/:storyId" element={<ViewStories/>}/>
      </Routes>
    </Router>
    
   
  );
}

export default App;