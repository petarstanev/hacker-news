import React from "react";

const StoriesContext = React.createContext({
  displayStories: [],
  selectedStory: {},
  selectedStoryType: {},
  setStoryType: () => {},
  setSelectStory: () => {},
});

export default StoriesContext;
