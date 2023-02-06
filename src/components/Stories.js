import StoriesList from "./StoriesList";
import StoryDetail from "./StoryDetail";
import StoriesSelector from "./StoriesSelector";
import { useContext } from "react";
import StoriesContext from "../store/stories-context";
import React from "react";

const Stories = () => {
  const context = useContext(StoriesContext);

  return (
    <React.Fragment>
      <StoriesSelector />
      {context.selectedStory ? <StoryDetail /> : <StoriesList />}
    </React.Fragment>
  );
};

export default Stories;
