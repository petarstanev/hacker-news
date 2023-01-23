import { getTopStories } from "../util/api";
import { useEffect, useState } from "react";
import StoryItem from "./StoryItem";

const StoriesList = (props) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const topStories = await getTopStories();
      const top10stories = topStories.slice(0, 10);
      setStories(top10stories);
    };
    getData();
  }, []);

  return (
    <ul>
      {stories.map((story) => {
        return (
          <StoryItem
            key={story}
            id={story}
            onStoryOpen={props.onStoryOpen}
          />
        );
      })}
    </ul>
  );
};

export default StoriesList;
