import StoriesList from "./components/StoriesList";
import StoryDetail from "./components/StoryDetail";
import React, { useState } from "react";

function App() {
  const [selectedStory, setStory] = useState();
 
  const storyOpenHandler = (story) => {
    setStory(story);
  };

  return (
    <React.Fragment>
      <StoriesList onStoryOpen={storyOpenHandler} />
      {selectedStory && <StoryDetail story={selectedStory} />}
    </React.Fragment>
  );
}

export default App;
