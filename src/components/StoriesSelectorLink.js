import { useContext } from "react";
import StoriesContext from "../store/stories-context";

const StoriesSelectorLink = (props) => {
  const context = useContext(StoriesContext);

  const selectorHandler = () => {
    context.setStoryType(props.type);
  };

  if (context.selectedStoryType === props.type) {
    return (
      <li onClick={selectorHandler}>
        <b>{props.children}</b>
      </li>
    );
  } else {
    return <li onClick={selectorHandler}>{props.children}</li>;
  }
};

export default StoriesSelectorLink;
