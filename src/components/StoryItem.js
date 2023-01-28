import { useGetItem } from "../hooks/useGetItem";

const StoryItem = (props) => {
  const [story, loading] = useGetItem(props.id);
  const openStoryHandler = () => {
    props.onStoryOpen(story);
  };

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <li onClick={openStoryHandler}>
      {new Date(story.time*1000).toDateString()} | {story.score} | {story.descendants} <strong>{story.title}</strong>
    </li>
  );
};

export default StoryItem;
