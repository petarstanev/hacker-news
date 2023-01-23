import StoriesList from "./components/StoriesList";
import StoryDetail from "./components/StoryDetail";
import React, { useState } from "react";

function App() {
  const [selectedStory, setStory] = useState(null);

  const storyOpenHandler = (story) => {
    setStory(story);
  };

  return (
    <React.Fragment>
      {selectedStory ? (
        <StoryDetail story={selectedStory} />
      ) : (
        <StoriesList onStoryOpen={storyOpenHandler} />
      )}
    </React.Fragment>
  );
}

export default App;
