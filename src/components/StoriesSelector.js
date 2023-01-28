import { useContext } from "react";
import StoriesContext from "../store/stories-context";

const StoriesSelector = () => {
  const context = useContext(StoriesContext);

  const selectorHandler = (type) => {
    context.setStoryType(type);
  };

  return (
    <nav>
      <ul>
        <li onClick={selectorHandler.bind(null, "beststories")}>Hot</li>
        <li onClick={selectorHandler.bind(null, "newstories")}>New</li>
        <li onClick={selectorHandler.bind(null, "topstories")}>Top</li>
        <li onClick={selectorHandler.bind(null, "topstories")}>Top 10</li>
      </ul>
    </nav>
  );
};

export default StoriesSelector;
