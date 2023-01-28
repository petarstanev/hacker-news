import StoriesList from "./components/StoriesList";
import StoryDetail from "./components/StoryDetail";
import { useState } from "react";
import StoriesSelector from "./components/StoriesSelector";
import React from "react";
import StoriesProvider from "./store/stories-provider";

function App() {
  const [selectedStory, setStory] = useState();

  const storyOpenHandler = (story) => {
    setStory(story);
  };

  return (
    <StoriesProvider>
      <StoriesSelector />
      <StoriesList onStoryOpen={storyOpenHandler} />
      {selectedStory && <StoryDetail story={selectedStory} />}
    </StoriesProvider>
  );
}

export default App;
