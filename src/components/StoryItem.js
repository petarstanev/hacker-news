import { useContext } from "react";
import { useGetItem } from "../hooks/useGetItem";
import StoriesContext from "../store/stories-context";

const StoryItem = (props) => {
  const context = useContext(StoriesContext);
  const [story, loading] = useGetItem(props.id);

  if (loading) {
    return <p>Loading</p>;
  }
  // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


  return (
    <li onClick={context.setSelectStory.bind(null, story)}>
      {new Date(story.time * 1000).toLocaleDateString()} 
      {/* {story.descendants}  */}
       |{story.score}| 
      <strong> {story.title.slice(0,50)}</strong>
    </li>
  );
};

export default StoryItem;
