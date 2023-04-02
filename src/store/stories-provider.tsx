import { useState } from "react";
import StoriesContext, {SelectedStory} from "./stories-context";
import useGetStories from "../hooks/useGetStories";


const StoriesProvider = (props: { children: React.ReactNode }) => {
  const [category, setCategory] = useState("topstories");
  const [stories, isLoading] = useGetStories(category);
  const [selectedStory, setSelectStory] = useState<SelectedStory | null>();

  const setCategoryHandler = (category: string) => {
    setSelectStory(null); //set story to null if we change the category
    setCategory(category);
  };

  const setSelectStoryHandler = (story: SelectedStory | null) => {
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
