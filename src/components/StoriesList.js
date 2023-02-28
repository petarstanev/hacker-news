import { useContext } from "react";
import StoryItem from "./StoryItem";
import StoriesContext from "../store/stories-context";

const StoriesList = () => {
  const context = useContext(StoriesContext);

  return (
    <aside>
      <nav>
        <ul>
          {context.displayStories &&
            context.displayStories.map((story) => {
              return <StoryItem key={story.id} {...story} />;
            })}
        </ul>
      </nav>
    </aside>
  );
};

export default StoriesList;
