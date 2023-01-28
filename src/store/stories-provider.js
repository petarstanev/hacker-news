import { useState, useEffect } from "react";
import StoriesContext from "./stories-context";
import { getStories } from "../util/api";

const StoriesProvider = (props) => {
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

  const storiesContext = {
    stories: storiesState,
    setStoryType: setStoryTypeHandler,
  };

  return (
    <StoriesContext.Provider value={storiesContext}>
      {props.children}
    </StoriesContext.Provider>
  );
};

export default StoriesProvider;
