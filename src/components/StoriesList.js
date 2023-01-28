import { useContext } from "react";
import StoryItem from "./StoryItem";
import StoriesContext from "../store/stories-context";

const StoriesList = () => {
  const context = useContext(StoriesContext);

  return (
    <aside>
      <nav>
        <ul>
          {context.stories &&
            context.stories.map((story) => {
              return <StoryItem key={story} id={story} />;
            })}
        </ul>
      </nav>
    </aside>
  );
};

export default StoriesList;
