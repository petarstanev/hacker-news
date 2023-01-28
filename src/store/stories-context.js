import React from "react";

const StoriesContext = React.createContext({
  stories: [],
  selectedStory: {},
  setStoryType: () => {},
  setSelectStory: () => {},
});

export default StoriesContext;
