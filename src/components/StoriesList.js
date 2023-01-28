import { useContext } from "react";
import StoryItem from "./StoryItem";
import StoriesContext from "../store/stories-context";

const StoriesList = (props) => {
  const context = useContext(StoriesContext);

  return (
    <aside>
      <nav>
        <ul>
          {context.stories &&
            context.stories.map((story) => {
              return (
                <StoryItem
                  key={story}
                  id={story}
                  onStoryOpen={props.onStoryOpen}
                />
              );
            })}
        </ul>
      </nav>
    </aside>
  );
};

export default StoriesList;
