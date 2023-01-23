import StoriesList from "./components/StoriesList";
import StoryDetail from "./components/StoryDetail";
import { useState } from "react";

function App() {
  const [selectedStory, setStory] = useState();

  const storyOpenHandler = (story) => {
    setStory(story);
  };

  return (
    <div className="grid">
      <StoriesList onStoryOpen={storyOpenHandler} />
      {selectedStory && <StoryDetail story={selectedStory} />}
    </div>
  );
}

export default App;
