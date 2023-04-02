import React from "react";

export interface SelectedStory {
  url: string;
  title: string;
  score: string;
  by: string;
  time: string;
  kids: string[];
}

interface StoriesContextProps {
  displayStories: string | boolean | undefined;
  selectedStory: SelectedStory | null | undefined;
  category: string;
  isCategoryLoading: string | boolean | undefined;
  setSelectStory: (story: SelectedStory | null) => void;
  setCategory: (category: string) => void;
}

const StoriesContext = React.createContext<StoriesContextProps>(
  {
    displayStories: '',
    selectedStory: undefined,
    category: '',
    isCategoryLoading: false,
    setSelectStory: () => {},
    setCategory: () => {}
  }
);

export default StoriesContext;
