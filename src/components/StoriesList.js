import { useContext } from "react";
import StoryItem from "./StoryItem";
import StoriesContext from "../store/stories-context";

const StoriesList = () => {
  const context = useContext(StoriesContext);

  return (
    <div>
      {context.isCategoryLoading && <p>Loading ...</p>}
      {context.displayStories &&
        context.displayStories.map((story) => (
          <StoryItem key={story.id} {...story} />
        ))}
    </div>
  );
};

export default StoriesList;
