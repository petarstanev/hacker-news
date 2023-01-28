import { useContext } from "react";
import { useGetItem } from "../hooks/useGetItem";
import StoriesContext from "../store/stories-context";

const StoryItem = (props) => {
  const context = useContext(StoriesContext);
  const [story, loading] = useGetItem(props.id);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <li onClick={context.setSelectStory.bind(null, story)}>
      {new Date(story.time * 1000).toDateString()} | {story.score} |{" "}
      {story.descendants} <strong>{story.title}</strong>
    </li>
  );
};

export default StoryItem;
