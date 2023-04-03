import React from "react";
import { FullStory } from "./stories-provider";

interface StoriesContextProps {
  displayStories: FullStory[];
  selectedStory: FullStory | undefined;
  category: string;
  isCategoryLoading: boolean;
  setSelectStory: (story: FullStory | undefined) => void;
  setCategory: (category: string) => void;
}

const StoriesContext = React.createContext<StoriesContextProps>({
  displayStories: [],
  selectedStory: undefined,
  category: "",
  isCategoryLoading: false,
  setSelectStory: () => {},
  setCategory: () => {},
});

export default StoriesContext;
