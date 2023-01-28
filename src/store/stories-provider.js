import { useState, useEffect } from "react";
import StoriesContext from "./stories-context";
import { getStories } from "../util/api";

const StoriesProvider = (props) => {
  const [selectedStory, setSelectStory] = useState();
  const [storiesState, setStoriesState] = useState([]);
  const [storiesType, setTypeOfStories] = useState("topstories");

  useEffect(() => {
    const getData = async () => {
      const topStories = await getStories(storiesType);
      const top10stories = topStories.slice(0, 10);
      setStoriesState(top10stories);
    };
    getData();
  }, [storiesType]);

  const setStoryTypeHandler = (type) => {
    setTypeOfStories(type);
  };

  const setSelectStoryHandler = (story) => {
    setSelectStory(story);
  };

  const storiesContext = {
    stories: storiesState,
    selectedStory: selectedStory,
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
