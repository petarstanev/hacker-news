import { useContext } from "react";
import StoryItem from "./StoryItem";
import StoriesContext from "../store/stories-context";

const StoriesList = () => {
  const context = useContext(StoriesContext);
  if (context.displayStories.view === "group") {
    return (
      <div>
        {context.displayStories.stories &&
          context.displayStories.stories.map((group) => {
            return (
              <div key={group[0]}>
                {group[0]}
                <ul>
                  {group[1].map((story) => {
                    return <li key={story.id}>{story.title}</li>
                  })}
                </ul>
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <aside>
      <nav>
        <ul>
          {context.displayStories.stories &&
            context.displayStories.stories.map((story) => {
              return <StoryItem key={story} id={story} />;
            })}
        </ul>
      </nav>
    </aside>
  );
};

export default StoriesList;
