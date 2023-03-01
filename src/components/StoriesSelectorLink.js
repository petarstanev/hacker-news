import { useContext } from "react";
import StoriesContext from "../store/stories-context";

const StoriesSelectorLink = (props) => {
  const context = useContext(StoriesContext);

  const selectorHandler = () => {
    context.setCategory(props.category);
  };

  if (context.category === props.category) {
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
