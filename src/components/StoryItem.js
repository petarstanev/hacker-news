import { useContext } from "react";
import StoriesContext from "../store/stories-context";

const StoryItem = (props) => {
  const context = useContext(StoriesContext);

  return (
    <li onClick={context.setSelectStory.bind(null, props)}>
      {new Date(props.time * 1000).toLocaleDateString()}
      {/* {story.descendants}  */}|{props.score}|
      <strong> {props.title.slice(0, 50)}</strong>
    </li>
  );
};

export default StoryItem;
