import { useState, useEffect } from "react";
import StoriesContext from "./stories-context";
import { getItem, getStoriesIds } from "@/utils/api";

export interface FullStory {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

let storiesMap = new Map();

const StoriesProvider = (props: { children: React.ReactNode }) => {
  const [category, setCategory] = useState("topstories");
  const [loadedStories, setLoadedStories] = useState<FullStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStory, setSelectStory] = useState<FullStory>();

  useEffect(() => {
    setIsLoading(true);
    getStoriesIds(category).then((storiesIds: string[]) => {
      let itemsPromise = storiesIds.map((id: string) => {
        if (storiesMap.has(id)) {
          let cacheStory = storiesMap.get(id);
          console.log("CACHE ", cacheStory.by, cacheStory.title);
          return cacheStory;
        } else {
          return getItem(id).then((apiStory: FullStory) => {
            storiesMap.set(apiStory.id, apiStory);
            console.log("API ", apiStory.by, apiStory.title);
            return apiStory;
          });
        }
      });
      Promise.all(itemsPromise).then((loadedStoriesForCategory) => {
        console.log("--- FINISH LOADING --- " + category);
        setIsLoading(false);
        setLoadedStories(loadedStoriesForCategory);
      });
    }); //500 top stories
  }, [category]);

  const setCategoryHandler = (category: string) => {
    setSelectStory(undefined); //set story to null if we change the category
    setCategory(category);
  };

  const setSelectStoryHandler = (story: FullStory | undefined) => {
    setSelectStory(story);
  };

  const storiesContext = {
    displayStories: loadedStories,
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
