import React from "react";

const StoriesContext = React.createContext({
  displayStories: [],
  selectedStory: {},
  setSelectStory: () => {},
  category: {},
  isCategoryLoading: false,
  setCategory: () => {},
});

export default StoriesContext;
