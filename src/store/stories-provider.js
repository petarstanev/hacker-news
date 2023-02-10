import { useState, useEffect } from "react";
import StoriesContext from "./stories-context";
import { getStories, getItem } from "../util/api";

const StoriesProvider = (props) => {
  const [selectedStory, setSelectStory] = useState();
  const [displayStoriesState, setDisplayStoriesState] = useState({
    stories: [],
    view: "",
  });
  const [storiesType, setTypeOfStories] = useState("topstories");

  useEffect(() => {
    const getData = async () => {
      if (storiesType === "top10stories") {
        const topStories = await getStories("topstories");
        const top10stories = topStories.slice(0, 30);
        let promiseArr = [];
        for (let i = 0; i < top10stories.length; i++) {
          let storyPromise = getItem(top10stories[i]);
          promiseArr.push(storyPromise);
        }
        Promise.all(promiseArr).then((stories) => {
          let map = new Map();
          for (let story of stories) {
            let dates = new Date(story.time * 1000).toISOString().split("T")[0];
            let value = map.get(dates) || [];
            value.push(story);
            map.set(dates, value);
          }
          for (let i of map.values()) {
            console.log(i);
            i.sort((a, b) => b.score - a.score); //increasing
          }
          setDisplayStoriesState({ stories: [...map], view: "group" });
        });
      } else {
        const topStories = await getStories(storiesType);
        const top10stories = topStories.slice(0, 30);
        setDisplayStoriesState({ stories: top10stories, view: "single" });
      }
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
    displayStories: displayStoriesState,
    selectedStory: selectedStory,
    selectedStoryType: storiesType,
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
