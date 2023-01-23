import { useEffect, useState } from "react";
import { getItem } from "../util/api";

const StoryItem = (props) => {
  const [story, setStory] = useState({});

  useEffect(() => {
    const getData = async () => {
      const story = await getItem(props.id);
      setStory(story);
    };
    getData();
  }, [props.id]);

  const openStoryHandler = () => {
    props.onStoryOpen(story);
  };

  return (
    <li onClick={openStoryHandler}>
      {story.score} | {story.descendants} <strong>{story.title}</strong>
    </li>
  );
};

export default StoryItem;
