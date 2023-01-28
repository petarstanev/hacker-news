import React from "react";

const StoriesContext = React.createContext({
  items: [],
  setStoryType: () => {},
});

export default StoriesContext;
