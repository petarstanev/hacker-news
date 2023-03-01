import React from "react";

const StoriesContext = React.createContext({
  displayStories: [],
  selectedStory: {},
  setSelectStory: () => {},
  category: {},
  setCategory: () => {},
});

export default StoriesContext;
