import { useState } from "react";
import StoriesContext from "./stories-context";
import useGetStories from "../hooks/useGetStories";

const StoriesProvider = (props) => {
  const [category, setCategory] = useState("topstories");
  const [stories, isLoading, error] = useGetStories(category);
  const [selectedStory, setSelectStory] = useState();

  const setCategoryHandler = (category) => {
    setSelectStory(null); //set story to null if we change the category
    setCategory(category);
  };

  const setSelectStoryHandler = (story) => {
    setSelectStory(story);
  };

  const storiesContext = {
    displayStories: stories,
    selectedStory: selectedStory,
    category: category,
    isCategoryLoading: isLoading,
    setCategory: setCategoryHandler,
    setSelectStory: setSelectStoryHandler,
  };

  return (
    <StoriesContext.Provider value={storiesContext}>
      {props.children}
    </StoriesContext.Provider>
  );
};

export default StoriesProvider;
