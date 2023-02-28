import { useState } from "react";
import StoriesContext from "./stories-context";
import useGetStories from "../hooks/useGetStories";

const StoriesProvider = (props) => {
  const [storiesType, setTypeOfStories] = useState("topstories");
  const { isLoading, stories = [] } = useGetStories(storiesType);
  const [selectedStory, setSelectStory] = useState();

  const setStoryTypeHandler = (type) => {
    setSelectStory(null); //set story to null if we change the type
    setTypeOfStories(type);
  };

  const setSelectStoryHandler = (story) => {
    setSelectStory(story);
  };

  const storiesContext = {
    displayStories: stories,
    selectedStory: selectedStory,
    selectedStoryType: storiesType,
    setStoryType: setStoryTypeHandler,
    setSelectStory: setSelectStoryHandler,
  };

  return (
    <StoriesContext.Provider value={storiesContext}>
      {props.children}
    </StoriesContext.Provider>
  );
};

export default StoriesProvider;
