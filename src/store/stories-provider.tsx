import { useState, useEffect } from "react";
import StoriesContext from "./stories-context";
import { getItem, getStoriesIds } from "@/utils/api";
import CategoryType from "@/interfaces/CategoryType";
import { CommentProp } from "@/components/Comment";
import { ObjectId } from "mongodb";

// TODO : Move interfaces in new place
export interface FullStory {
  id: number;
  deleted?: boolean;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  by: string; //username
  time: number; // Unix time
  text?: string; //HTML
  dead?: boolean;
  parent?: number; //comment parent or the relevant story
  poll?: number; // just for poll part(answer)
  kids: number[]; //item comments
  url: string;
  score: number;
  title: string;
  parts?: string[]; //just for poll list of answers
  descendants: number[]; //total number of comments
}

export interface FullStoryFormatted extends FullStory {
  formattedLink?: string;
  formattedText?: string | JSX.Element | JSX.Element[]; //parsed HTML
}

export interface FullStoryFormattedMongo extends FullStoryFormatted {
  _id?: ObjectId;
  date: Date;
  comments: CommentProp[]
}

let storiesMap = new Map();

const StoriesProvider = (props: { children: React.ReactNode }) => {
  const [category, setCategory] = useState<CategoryType>(
    "topstories" as CategoryType
  );
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

  const setCategoryHandler = (category: CategoryType) => {
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
