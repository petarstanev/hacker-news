import React from "react";

const StoriesContext = React.createContext({
  stories: [],
  selectedStory: {},
  selectedStoryType: {},
  setStoryType: () => {},
  setSelectStory: () => {},
});

export default StoriesContext;
