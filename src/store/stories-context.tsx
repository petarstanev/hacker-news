import React from "react";
import { FullStory } from "./stories-provider";
import CategoryType from "@/interfaces/CategoryType";

interface StoriesContextProps {
  displayStories: FullStory[];
  selectedStory: FullStory | undefined;
  category: string;
  isCategoryLoading: boolean;
  setSelectStory: (story: FullStory | undefined) => void;
  setCategory: (category: CategoryType) => void;
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
