import StoriesList from "./components/StoriesList";
import StoryDetail from "./components/StoryDetail";
import StoriesSelector from "./components/StoriesSelector";
import React from "react";
import StoriesProvider from "./store/stories-provider";

function App() {
  return (
    <StoriesProvider>
      <StoriesSelector />
      <StoriesList />
      <StoryDetail />
    </StoriesProvider>
  );
}

export default App;
